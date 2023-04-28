import { IUser } from './interfaces/IUser.interface';
import { MysqlDataSource } from "../configs/db";
import { JwtPayload } from '../entities/dto/GeneralDto';
import { UserDto, UserEditDto, UserEditPassDto } from '../entities/dto/UserDto';
import { ListPaginate } from '../entities/dto/GeneralDto';
import UserRepository from '../repositories/User.Repository';
import RolUserService from './RolUser.service';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import { User } from '../entities/User';
import AuthService from './Auth.service';
import { EstadoEnum } from '../configs/Config.enum';

class UserService implements IUser {

    async list(limit: number, page: number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        try {
            const query = await UserRepository.findAll(limit, page)
            res.data = query?.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query?.count || 0;
        } catch (error) {
            // if (error instanceof TypeError) {
            console.error(error);
            // }
        }

        return res;
    }

    async updatePassword(id: string, password: string): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await UserRepository.findByIdActive(id);
            if (!userDtoFind) {
                res.message = "Usuario no encontrado!";
            } else {
                const userEditDto:UserEditPassDto={
                    password:AuthService.encrypt(password),
                    fechaModificacion:getFecha(new Date()),
                };
                const oRolUsuario = await UserRepository.actualizar(id, userEditDto);
                res.data = oRolUsuario;

                res.success = true;
                res.message = "Usuario actualizado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async edit(id: string, userEditDto: UserEditDto): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await UserRepository.findByIdActive(id);
            if (!userDtoFind) {
                res.message = "Usuario no encontrado!";
            } else {
                res.success = true;
                res.message = "Usuario actualizado!";

                userEditDto.fechaModificacion = getFecha(new Date());
                const oRolUsuario = await UserRepository.actualizar(id, userEditDto);
                res.data = userEditDto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async createAdm(userDto: UserDto): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const oUser = new User(userDto);
            const oRolUsuario = await MysqlDataSource.manager.save(oUser);
            res.success = true;
            res.message = "Usuario registrado";
            oUser.password = AuthService.encrypt(userDto.password);
            res.data = oRolUsuario;
        } catch (error) {
            console.error(error);
        }
        return res;
    }

    async create(userDto: UserDto): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            let oUser = new User(userDto);
            oUser.password = AuthService.encrypt(userDto.password);
            const oUserFind = await UserRepository.findByUsername(userDto.username);
            if(!oUserFind){
                oUser.usuarioRegistro = userDto.username;
                oUser = await UserRepository.save(oUser);
                res.message = "Usuario registrado";
                res.success = true;
                res.data = userDto;
            }else{
                res.message = "Username ya registrado";
            }
        } catch (error) {
            console.error(error);
        }
        return res;
    }
    
    async getUsuario(usuario: string):Promise<string> {
        const query = usuario;
        try {
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
            return ""
        }
        return query;
    }

    async desactivar(idUser: string): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await UserRepository.findById(idUser);
            if (userDtoFind) {
                res.success = true;
                res.message = "Cliente eliminado";
                const oRolUsuario = UserRepository.desactivar(idUser);

            } else {
                res.message = "Cliente no encontrado!";
                // res.data = oRolUsuario;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

}

export default new UserService();