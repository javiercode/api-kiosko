import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import ProductoService from '../services/Producto.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { ProductoDto } from "../entities/dto/ProductoDto";

class ProductoController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await ProductoService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async qr(req: Request, res: Response) {
        const { id } = req.params;
        const result = await ProductoService.getQR(Number.parseInt(id));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await ProductoService.listAll();
        return res.status(200).send(result);
    }

    public async findFecha(req: Request, res: Response) {
        const fecha = req.body.fecha;
        let result = validateParams(fecha,TypeKeyParamEnum.DATE)
        
        if(result.success){
            result = await ProductoService.findByDate(fecha);
        }
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const userDto = req.body as ProductoDto;
        const result = await ProductoService.create(userDto, getAuthUser(req));
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as ProductoDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.PK_ORACLE)
        
        if(result.success){
            result = await ProductoService.edit((req.params.id), userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await ProductoService.desactivar((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}
export default new ProductoController();