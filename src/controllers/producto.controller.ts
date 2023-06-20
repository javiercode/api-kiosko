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

    public async getCodigo(req: Request, res: Response) {
        const { codigo } = req.params;
        const result = await ProductoService.getCodigo((codigo));
        return res.status(200).send(result);
    }

    public async qrImg(req: Request, res: Response) {
        const { id } = req.params;
        const result = await ProductoService.getQRImg(Number.parseInt(id), getAuthUser(req));
        // res.setHeader('content-type', 'application/jpg');
        res.contentType('image/jpeg');
        // res.end()
        // res.type('jpg')
        // return res.status(200).download(result.data.pathFile);
        // var buf = Buffer.from(result.data, 'base64'); // Ta-da
        return res.status(200).end(result.data);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await ProductoService.listAll(Number.parseInt(page), Number.parseInt(limit));
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const dto = req.body as ProductoDto;
        const result = await ProductoService.create(dto, getAuthUser(req));
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as ProductoDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.PK_ORACLE)
        
        if(result.success){
            result = await ProductoService.edit(Number.parseInt(req.params.id), userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await ProductoService.desactivar(Number.parseInt(req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}
export default new ProductoController();