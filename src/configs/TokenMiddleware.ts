import { Request, Response, NextFunction } from 'express';
import { decode } from 'punycode';
import { JwtPayload, MessageResponse } from '../entities/dto/GeneralDto';
import { RolesEnum } from '../configs/Config.enum';
import RolRepository from '../repositories/Rol.Repository';
import jwt from 'jsonwebtoken';

export const TokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    const aToken = authHeader?.split(' ');
    if (req.originalUrl.toString().includes("/login") || req.originalUrl.toString().includes("/usuario/create")) {
        next()
    } else {
        if (req.originalUrl.toString().includes("/usuario/create") || req.originalUrl.toString().includes("/login") || aToken?.length == 2) {
            const token: string = authHeader?.split(' ')[1] || '';
            const decodeToken = getAuthUser(req)

            if (token && decodeToken.activo) {
                res = encodeToken(res, decodeToken.username, decodeToken.name, decodeToken.rol, decodeToken.aRolId, decodeToken.aSucursal, decodeToken.sucursal, decodeToken.departamento);
                next()
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }

}

export const encodeToken = (res: Response, usuario: string, nombre: string, rol: string[], rolId: string[], aSucursal: number[], sucursal: number, departamento: number) => {
    const userForToken: JwtPayload = {
        username: usuario,
        name: nombre,
        rol: rol,
        aRolId: rolId,
        aSucursal: aSucursal,
        sucursal: sucursal,
        departamento: departamento,
        activo: true
    }

    const token = jwt.sign(
        userForToken,
        process.env.JWT_TOKEN_SECRET || '',
        {
            expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRE || '0')
        }
    )
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Authorization', token)
    return res;
}

export const getToken = (res: Response, usuario: string, nombre: string, rol: string[], rolId: string[], aSucursal: number[], sucursal: number, departamento: number) => {
    const userForToken: JwtPayload = {
        username: usuario,
        name: nombre,
        rol: rol,
        aRolId: rolId,
        aSucursal: aSucursal,
        sucursal: sucursal,
        departamento: departamento,
        activo: true
    }

    const token = jwt.sign(
        userForToken,
        process.env.JWT_TOKEN_SECRET || '',
        {
            expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRE || '0')
        }
    )
    return token;
}

export const getAuthUser = (req: Request) => {
    let auth = {
        username: "",
        name: "",
        rol: [],
        aRolId: [],
        aSucursal: [],
        sucursal: 0,
        departamento: 0,
        activo: false
    } as JwtPayload;
    try {

        const authHeader = req.get('Authorization');
        const token: string = authHeader?.split(' ')[1] || '';
        auth = jwt.verify(token, process.env.JWT_TOKEN_SECRET || '') as JwtPayload;
    } catch (error) {
        console.error(error)
    }
    return auth;
}

export const esJugador = (auth: JwtPayload) => {
    const aRol = auth.rol || [];
    const esAdmin = aRol.filter(rolAplicacion => rolAplicacion !== RolesEnum.JUGADOR)
    return esAdmin.length==0;
}

export const esAdmin = (auth: JwtPayload) => {
    const aRol = auth.rol || [];
    const rolFind = aRol.find(element => (element === RolesEnum.ADMIN))
    return rolFind !== undefined;
}

export const esSeo = (auth: JwtPayload) => {
    const aRol = auth.rol || [];
    const rolFind = aRol.find(element => (element === RolesEnum.SEO))
    return rolFind !== undefined;
}

export async function controlJurisdiccion(sucursal: number, authSession: JwtPayload): Promise<MessageResponse> {
    const res: MessageResponse = { success: false, message: "El usuario no tiene la jurisdicción para proceder", code: 0 };
    try {
        if(!esAdmin(authSession)){
            const resultFilter = authSession.aSucursal.filter(oSucursal => oSucursal == sucursal);
            res.success = resultFilter.length > 0;
            res.message = res.success ? "El usuario tiene la jurisdicción para proceder" : "El usuario no tiene la jurisdicción para proceder"
        }else{
            res.success=true;
            res.message="El usuario tiene la jurisdicción para proceder";
        }
    } catch (error) {
        console.error(error)
    }
    return res;
}

// 1,ADM
// 4,GER
// 3,JEF
// 2,OFI

export const controlJerarquia = async (rol: string, authSession: JwtPayload): Promise<MessageResponse> => {
    const res: MessageResponse = { success: false, message: "El usuario no tiene los permisos para proceder", code: 0 };
    const result = await RolRepository.findById(rol);
    try {
        if (result) {
            if (esAdmin(authSession)) {
                res.success = true;
                res.message = "El usuario tiene los permisos para proceder"
            } else {
                const resultSession = await RolRepository.findByINId(authSession.aRolId);
                const conJerarquia = resultSession.filter(rolAplicacion => rolAplicacion.jerarquia < result.jerarquia)            
                if (conJerarquia.length==0) {
                    res.success = false
                } else {
                    const resultFilter = resultSession.filter(rolAplicacion => rolAplicacion.jerarquia < result?.jerarquia);
                    res.success = resultFilter.length > 0;
                    res.message = res.success ? "El usuario tiene la jerarquia para proceder" : "El usuario no tiene jerarquia para proceder"
                }
            }
        }
    } catch (error) {
        console.error(error)
    }
    return res;
}

export const controlPermisos = async (sucursal: number, rol: string, authSession: JwtPayload): Promise<MessageResponse> => {
    let res: MessageResponse = { success: true, message: "El usuario tiene los permisos para proceder", code: 0 };
    const cJurisdiccion = await controlJurisdiccion(sucursal, authSession);
    //Control jurisdiccion
    if (cJurisdiccion.success) {
        //Control jeraquia
        const cJerarquia = await controlJerarquia(rol, authSession);
        res = cJerarquia;
    } else {
        res = cJurisdiccion;
    }
    return res;
}