import { JwtPayload } from '../entities/dto/GeneralDto';
import { EquipoEditDto, EquipoDto } from '../entities/dto/EquipoDto';
import { Equipo} from '../entities/Equipo';
import EquipoRepository from '../repositories/Equipo.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IEquipo from './interfaces/IEquipo.interface';


class EquipoService implements IEquipo {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await EquipoRepository.listAll();
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }

    async edit(id: string, dto: EquipoEditDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await EquipoRepository.findById(id) as Equipo;
            const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind || !(isActive)) {
                res.message = "Equipo no encontrado!";
            } else {
                dto.fechaModificacion = getFecha(new Date());
                await EquipoRepository.actualizar(id, dto);
                res.data = dto;
                res.success = true;
                res.message = "Equipo actualizado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: EquipoDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            dto.nombre = dto.nombre.toUpperCase();
            let oEquipo = new Equipo(dto);
            oEquipo.usuarioRegistro = authSession.username;
            oEquipo.fechaRegistro = getFecha(new Date())
            const oEquipoFind = await EquipoRepository.findByNombre(dto.nombre);
            if(!oEquipoFind){
                oEquipo = await EquipoRepository.save(oEquipo);
                res.success = true;
                res.message = "Equipo registrado";
                res.data = oEquipo;
            }else{
                res.message = "Nombre de Equipo duplicado";
            }
            
        } catch (error) {
            console.error(error);
        }
        return res;
    }

    async desactivar(idUser: string, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await EquipoRepository.findById(idUser);
            if (userDtoFind) {
                EquipoRepository.desactivar(idUser);
                res.success = true;
                res.message = "Equipo eliminado";

            } else {
                res.message = "Equipo no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
}

export default new EquipoService();