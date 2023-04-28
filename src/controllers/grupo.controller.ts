import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import GrupoService from '../services/Grupo.service';
import RolUserService from '../services/RolUser.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { GrupoDto, GrupoEditDto, GrupoRegex } from "../entities/dto/GrupoDto";

class GrupoController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await GrupoService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await GrupoService.listAll();
        return res.status(200).send(result);
    }

    public async listByUser(req: Request, res: Response) {
        const { username } = req.params;
        let result = validateParams(username,TypeKeyParamEnum.USER)
        if(result.success){
            result = await RolUserService.listGrupo(username);
        }
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const dto = req.body as GrupoDto;
        let result = validate(dto);
        if(result.success){
            result = await GrupoService.create(dto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as GrupoEditDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        if(result.success){
            result = await GrupoService.edit((req.params.id), userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await GrupoService.desactivar((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}

function validate(dataForm: GrupoDto): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(GrupoRegex).forEach((key:string) => {
            const value = dataForm[key as keyof GrupoDto];
            const regexValue = GrupoRegex[key as keyof GrupoDto] as string;
            let regex = new RegExp(regexValue);
            if (value && !regex.test(value.toString())) {
                campoError.push(key);
            }
        });
        res.success = campoError.length==0;
        res.message = campoError.length > 0? (res.message + campoError.join(", ")):"Sin error";    
    } catch (error) {
        console.error(error)
    }
    
    return res;
}
export default new GrupoController();