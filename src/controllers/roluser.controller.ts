import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import jwt from 'jsonwebtoken';
import RolUsersService from '../services/RolUser.service';
import AuthService from '../services/Auth.service';
import { RolUserDto, RolUserRegex } from '../entities/dto/RolUserDto';

import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";

class RolUserController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await RolUsersService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async listRoles(req: Request, res: Response) {
        const username = req.params.username;
        const resultPage = validateParams(username,TypeKeyParamEnum.USER)
        let result;
        if(resultPage.success ){
            result = await AuthService.getMetadata(username);
        }
        return res.status(200).send(result);
    }

    public async listUsuario(req: Request, res: Response) {
        const { page, limit } = req.params;
        const resultPage = validateParams(page,TypeKeyParamEnum.PAGE)
        const resultLimit = validateParams(limit,TypeKeyParamEnum.LIMIT)
        let result;
        if(resultLimit.success && resultPage.success){
            result = await RolUsersService.list(parseInt(limit), parseInt(page));
        }else{
            result = resultLimit.success? resultPage: resultLimit;
        }
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const userDto = req.body as RolUserDto;
        let result = validate(userDto);
        if(result.success){
            result = await RolUsersService.create(userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as RolUserDto;
        const resultPk = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        let result = validate(userDto);
        if(result.success && resultPk.success){
            result = await RolUsersService.edit((req.params.id), userDto, getAuthUser(req));
        }else{
            result = result.success? resultPk: result;
        }
        return res.status(200).send(result);
    }

    public async deleteRolUsuario(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await RolUsersService.desactivarUser((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}

function validate(dataForm: RolUserDto): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(RolUserRegex).forEach((key:string) => {
            const value = dataForm[key as keyof RolUserDto];
            const regexValue = RolUserRegex[key as keyof RolUserDto] as string;
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

export default new RolUserController();