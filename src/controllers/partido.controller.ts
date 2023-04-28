import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import PartidoService from '../services/Partido.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { PartidoDto, PartidoEditDto } from "../entities/dto/PartidoDto";

class PartidoController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await PartidoService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await PartidoService.listAll();
        return res.status(200).send(result);
    }

    public async findFecha(req: Request, res: Response) {
        const fecha = req.body.fecha;
        let result = validateParams(fecha,TypeKeyParamEnum.DATE)
        
        if(result.success){
            result = await PartidoService.findByDate(fecha);
        }
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const userDto = req.body as PartidoDto;
        const result = await PartidoService.create(userDto, getAuthUser(req));
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as PartidoEditDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.PK_ORACLE)
        
        if(result.success){
            result = await PartidoService.edit((req.params.id), userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await PartidoService.desactivar((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}
export default new PartidoController();