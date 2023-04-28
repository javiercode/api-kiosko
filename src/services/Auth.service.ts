
import { IAuth } from './interfaces/IAuth.interface';
import { JwtPayload } from '../entities/dto/GeneralDto';
import { MessageResponse,LoginResponce } from '../entities/dto/GeneralDto'
import UsersService from './User.service';
import * as crypto from "crypto";
import RolUserRepository from '../repositories/RolUser.Repository';
import UserRepository from '../repositories/User.Repository';

class AuthService implements IAuth {

    async auth(username: string, password: string): Promise<MessageResponse> {
        let result: MessageResponse = {
            success: false,
            message: 'Error al iniciar sesión',
            code: 0,
        }
        try {
            const verifyUser = await this.verifyCredential(username, password);
            if(verifyUser.success){
                const userRolDetalle = await RolUserRepository.findDetalleByUser(username);
                result = {
                    success: true,
                    message: 'Sesion iniciada',
                    code: 0,
                    data: userRolDetalle
                };
            }else{
                result.success = verifyUser.success
                result.message = verifyUser.message
            }
        } catch (error) {
            console.error(error);
        }
        return result;

    }

    async getMetadata(username: string): Promise<MessageResponse> {
        let result: MessageResponse = {
            success: false,
            message: 'Sin regitros',
            code: 0,
        }
        try {
            const userRolDetalle = await RolUserRepository.findDetalleByUser(username);
            result = {
                success: true,
                message: 'Obtención exitosa!',
                code: 0,
                data: userRolDetalle
            };
        } catch (error) {
            console.error(error);
        }
        return result;

    }

    async verifyCredential(username: string, password: string): Promise<MessageResponse> {
        let result: MessageResponse = {
            code: 200,
            success: false,
            message: 'Error al validar la sesión',
        }
        try {

            /*let salt = 'f844b09ff50c';            
            let passVerify = crypto.pbkdf2Sync(password, salt,  
                1000, 64, `sha512`).toString(`hex`);*/
            const passVerify = this.encrypt(password);
            const verify= await UserRepository.findCredenciales(username,passVerify);
            result.success = verify !=null;
            result.message = result.success? "Sesión iniciada":"El usuario o contraseña es inválido";
            if(result.success){
                result.data= verify;
            }
        } catch (error:any) {
            console.error(error)
            if(error.response && error.response.status && error.response.status==401){
                // result.message = error.response.data.message
                result.message = "El usuario o contraseña es inválido"
            }
        }        
        return result;
    }

    encrypt(password: string): string {
        let salt = process.env.PASS_SALT + "";
        let hash = crypto.pbkdf2Sync(password, salt,
            300, 64, `sha512`).toString(`hex`);
        return hash;
    }
}

export default new AuthService();