import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import { RolUser } from '../entities/RolUser';
import jwt from 'jsonwebtoken';
import RolService from '../services/Rol.service';

import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { RolDto, RolDtoForm, RolEditDto, RolRegex } from "../entities/dto/RolDto";

class RolController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await RolService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await RolService.listAll();
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const userDto = req.body as RolDto;
        const result = await RolService.create(userDto, getAuthUser(req));
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as RolEditDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        if(result.success){
            result = await RolService.edit((req.params.id), userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await RolService.desactivar((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}
export default new RolController();