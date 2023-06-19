import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import MovimientoService from '../services/Movimiento.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { MovimientoDto, ApuestaRegex, OApuestaRegex } from "../entities/dto/MovimientoDto";

class MovimientoController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await MovimientoService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await MovimientoService.listAll(Number.parseInt(page),Number.parseInt(limit),getAuthUser(req));
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const dto = req.body as MovimientoDto;
        let result = validate(dto);
        if(result.success){
            result = await MovimientoService.create(dto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async createAll(req: Request, res: Response) {
        const dtoList = req.body.data as MovimientoDto[];
        
        console.log("dtoList",dtoList)
        let isValid = true;
        dtoList.forEach(dto => {
            if(!validate(dto)){
                isValid=false;
            }  
        });
        let result: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        if(isValid){
            result = await MovimientoService.createAll(dtoList, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const dto = req.body as MovimientoDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        if(result.success){
            result = await MovimientoService.edit((req.params.id), dto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await MovimientoService.desactivar((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}

function validate(dataForm: MovimientoDto): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(ApuestaRegex).forEach((key:string) => {
            const value = dataForm[key as keyof OApuestaRegex];
            const regexValue = ApuestaRegex[key as keyof OApuestaRegex] as string;
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
export default new MovimientoController();