import { JwtPayload } from '../entities/dto/GeneralDto';
import { PartidoEditDto, PartidoDto } from '../entities/dto/PartidoDto';
import { Producto} from '../entities/Producto';
import PartidoRepository from '../repositories/Partido.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IPartido from './interfaces/IPartido.interface';


class PartidoService implements IPartido {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await PartidoRepository.listAll();
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

    async findByDate(fecha:string): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            const data = await PartidoRepository.findByDate(getFecha(fecha));
            res.data = data;
            res.success = true;
            res.message = "Obtención exitosa";
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }

    async edit(id: string, dto: PartidoEditDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await PartidoRepository.findById(id) as Producto;
            const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind || !(isActive)) {
                res.message = "Partido no encontrado!";
            } else {
                res.success = true;
                res.message = "Partido actualizado!";

                dto.fechaModificacion = getFecha(new Date());
                await PartidoRepository.actualizar(id, dto);
                res.data = dto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: PartidoDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            let oPartido = new Producto(dto);
            oPartido.usuarioRegistro = authSession.username;
            oPartido.fechaRegistro = getFecha(new Date())
            oPartido.fecha = getFecha(dto.fecha)
            const oPartidoFind = await PartidoRepository.findByDto(oPartido);

            if(!oPartidoFind){
                oPartido = await PartidoRepository.save(oPartido);
                res.success = true;
                res.message = "Partido registrado";
                res.data = oPartido;
            }else{
                res.message = "Partido duplicado";
            }
            
        } catch (error) {
            console.error(error);
        }
        return res;
    }

    async desactivar(idUser: string, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await PartidoRepository.findById(idUser);
            if (userDtoFind) {
                PartidoRepository.desactivar(idUser);
                res.success = true;
                res.message = "Partido eliminado";

            } else {
                res.message = "Partido no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
}

export default new PartidoService();