import { JwtPayload } from '../entities/dto/GeneralDto';
import { MarcaDto } from '../entities/dto/MarcaDto';
import { Marca} from '../entities/Marca';
import MarcaRepository from '../repositories/Marca.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IMarca from './interfaces/IMarca.interface';


class MarcaService implements IMarca {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(page:number, limit:number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await MarcaRepository.listAll(page,limit);
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            console.error(error);
        }

        return res;
    }

    async edit(id: string, dto: MarcaDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await MarcaRepository.findById(id) as Marca;
            const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind || !(isActive)) {
                res.message = "Grupo no encontrado!";
            } else {
                res.success = true;
                res.message = "Grupo actualizado!";

                // dto.fechaModificacion = getFecha(new Date());
                const oGrupo = await MarcaRepository.actualizar(id, dto);
                res.data = dto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: MarcaDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            dto.nombre = dto.nombre.toUpperCase();
            let oGrupo = new Marca(dto);
            oGrupo.usuarioRegistro = authSession.username;
            oGrupo.fechaRegistro = getFecha(new Date())
            const oGrupoFind = await MarcaRepository.findByNombre(dto.nombre);
            if(!oGrupoFind){
                oGrupo = await MarcaRepository.save(oGrupo);
                res.success = true;
                res.message = "Grupo registrado";
                res.data = oGrupo;
            }else{
                res.message = "Nombre de grupo duplicado";
            }
            
        } catch (error) {
            console.error(error);
        }
        return res;
    }
    
    async desactivar(idUser: string, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await MarcaRepository.findById(idUser);
            if (userDtoFind) {
                MarcaRepository.desactivar(idUser);
                res.success = true;
                res.message = "Grupo eliminado";

            } else {
                res.message = "Grupo no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
}

export default new MarcaService();