import { IRol } from './interfaces/IRol.interface';
import { JwtPayload } from '../entities/dto/GeneralDto';
import { RolEditDto, RolDto } from '../entities/dto/RolDto';
import { Rol} from '../entities/Rol';
import RolRepository from '../repositories/Rol.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';


class RolService implements IRol {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await RolRepository.listAll();
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }

    async edit(id: string, rolEditDto: RolEditDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await RolRepository.findById(id) as Rol;
            const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind || !(isActive)) {
                res.message = "Rol no encontrado!";
            } else {
                res.success = true;
                res.message = "Rol actualizado!";

                rolEditDto.fechaModificacion = getFecha(new Date());
                const oRolUsuario = await RolRepository.actualizar(id, rolEditDto);
                res.data = rolEditDto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(rolDto: RolDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            let oRol = new Rol(rolDto);
            oRol.usuarioRegistro = authSession.username;
            oRol.fechaRegistro = getFecha(new Date());
            const oRolFind = await RolRepository.findByCodigo(rolDto.codigo);
            if(!oRolFind){
                oRol = await RolRepository.save(oRol);
                res.success = true;
                res.message = "Rol registrado";
                res.data = oRol;
            }else{
                res.message = "Codigo Rol duplicado";
            }

            
        } catch (error) {
            console.error(error);
        }
        return res;
    }


    async desactivar(idUser: string, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await RolRepository.findById(idUser);
            if (userDtoFind) {
                res.success = true;
                res.message = "Rol eliminado";
                const oRolUsuario = RolRepository.desactivar(idUser);

            } else {
                res.message = "Rol no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
}

export default new RolService();