import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import EquipoService from '../services/Equipo.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { EquipoDto, EquipoEditDto, EquipoRegex } from "../entities/dto/EquipoDto";

class EquipoController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await EquipoService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await EquipoService.listAll();
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const userDto = req.body as EquipoDto;
        const result = await EquipoService.create(userDto, getAuthUser(req));
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as EquipoEditDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        if(result.success){
            result = await EquipoService.edit((req.params.id), userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await EquipoService.desactivar((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}
export default new EquipoController();