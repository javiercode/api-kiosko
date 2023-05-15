import { IRolUser } from './interfaces/IRolUser.interface';
import { JwtPayload } from '../entities/dto/GeneralDto';
import { RolUserDto } from '../entities/dto/RolUserDto';
import { RolUser } from '../entities/RolUser';
import RolUserRepository from '../repositories/RolUser.Repository';
import RolRepository from '../repositories/Rol.Repository';
import GrupoRepository from '../repositories/Categoria.Repository';
import UserRepository from '../repositories/User.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { RolesEnum } from '../configs/Config.enum';


class RolUserService implements IRolUser {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        const result = await RolUserRepository.findGrupoByUser("xaviercode");
        // const result = await this.controlJerarquia(4, authSession);
        // const result2 = await this.controlJurisdiccion(101, authSession);
        return res;
    }

    async list(limit: number, page: number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            res.data = [];
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = 0;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }

    async listGrupo(username: string): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            res.data = await RolUserRepository.findGrupoByUser(username);
            res.success = true;
            res.message = "Obtención exitosa";
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }

    async edit(id: string, rolUserDto: RolUserDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const rolUsuario = new RolUser(rolUserDto);
            const rolUserFind = await RolUserRepository.findById(id);

            //const permisos = await controlPermisos(rolUserDto.sucursal, rolUserDto.codRolAplicacion, authSession);
            if (rolUserFind) {
                res.success = true;
                res.message = "rol actualizado!";
                await RolUserRepository.actualizar(id, rolUserFind);
                res.data = rolUserDto;
            } else {
                res.message = "Rol no encontrado";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: RolUserDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const oRol = await RolRepository.findByCodigo(dto.rol);
            const oGrupo = await GrupoRepository.findByNombre(dto.grupo);
            const oUser = await UserRepository.findByUsername(dto.usuario);
            
            if(oRol && oUser && ((oGrupo && dto.rol!= RolesEnum.ADMIN) || (dto.rol== RolesEnum.ADMIN))){
                const rolUsuario = new RolUser(dto);
                rolUsuario.codRol = oRol.id;
                rolUsuario.codGrupo = oGrupo?.id || 0;
                rolUsuario.codUsuario = oUser.id;
                const oRolUser = await RolUserRepository.findByDto(rolUsuario);
                if(oRolUser==undefined){
                    rolUsuario.usuarioRegistro = authSession.username;
                    const oRolUsuario = RolUserRepository.save(rolUsuario);
                    res.success = true;
                    res.message = "Rol registrado";
                    res.data = oRolUsuario;
                }else{
                    res.message = "Rol duplicado";
                }
            } else {
                res.message = "El Rol no existe!";
            }
        } catch (error) {
            console.error(error);
        }
        return res;
    }

    async desactivarUser(idUser: string, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await RolUserRepository.findById(idUser);
            if (userDtoFind) {
                res.success = true;
                res.message = "rol eliminado";
                await RolUserRepository.desactivar(idUser);
            } else {
                res.message = "rol no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
    
}

export default new RolUserService();