import { JwtPayload } from '../entities/dto/GeneralDto';
import { MovimientoDto } from '../entities/dto/MovimientoDto';
import { Movimiento} from '../entities/Movimiento';
import MovmientoRepository from '../repositories/Movimiento.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IApuesta from './interfaces/IApuesta.interface';
import fs from 'fs';

class MovimientoService implements IApuesta {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        console.log("__dirname", __dirname);
        fs.readdirSync(__dirname+"/../routes").forEach(function(file) {
            console.log("file", file);
            //require('./' + name)(app);
        });

        /*module.exports = function(app){
            fs.readdirSync(__dirname).forEach(function(file) {
                if (file == "index.js") return;
                var name = file.substr(0, file.indexOf('.'));
                require('./' + name)(app);
            });
        }*/
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await MovmientoRepository.listAll();
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            console.error(error);
        }

        return res;
    }

    async edit(id: string, dto: MovimientoDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await MovmientoRepository.findById(id) as Movimiento;
            const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind || !(isActive)) {
                res.message = "Equipo no encontrado!";
            } else {
                // dto.fechaModificacion = getFecha(new Date());
                await MovmientoRepository.actualizar(id, dto);
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

    async create(dto: MovimientoDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            let oEquipo = new Movimiento(dto);
            oEquipo.usuarioRegistro = authSession.username;
            oEquipo.fechaRegistro = getFecha(new Date())
            const oEquipoFind = await MovmientoRepository.findByDto(dto);
            if(!oEquipoFind){
                oEquipo = await MovmientoRepository.save(oEquipo);
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
            const userDtoFind = await MovmientoRepository.findById(idUser);
            if (userDtoFind) {
                MovmientoRepository.desactivar(idUser);
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

export default new MovimientoService();