import { JwtPayload } from '../entities/dto/GeneralDto';
import { MovimientoDto } from '../entities/dto/MovimientoDto';
import { Movimiento} from '../entities/Movimiento';
import MovmientoRepository from '../repositories/Movimiento.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IApuesta from './interfaces/IApuesta.interface';
import fs from 'fs';
import QRCode from 'qrcode'
import ProductoRepository from '../repositories/Producto.Repository';

class MovimientoService implements IApuesta {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        // console.log("__dirname", __dirname);
        try {
            console.log(await QRCode.toDataURL("hola"))
          } catch (err) {
        console.error(err)
        }
        
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(page:number,limit:number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await MovmientoRepository.listAll(page,limit);
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
            res.suma = query.sum || 0;
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
            const oProducto2 = await ProductoRepository.findByCodigo(dto.codigoProducto);
            let oMovimiento = new Movimiento(dto);
            oMovimiento.usuarioRegistro = authSession.username;
            oMovimiento.fecha = getFecha(new Date())
            const oProducto = await ProductoRepository.findByCodigo(dto.codigoProducto);
            if(oProducto!=undefined){
                oMovimiento.monto = oProducto.monto;
                oMovimiento.codProducto = oProducto.id;
                oMovimiento.descuento = oProducto.descuento;
                oMovimiento = await MovmientoRepository.save(oMovimiento);
                res.success = true;
                res.message = "Movimiento registrado";
                res.data = oMovimiento;
            }else{
                res.message = "El producto no existe";
            }
            
        } catch (error) {
            console.error(error);
        }
        return res;
    }

    async createAll(dtoList: MovimientoDto[], authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: true, message: "Movimiento registrado", code: 0 };
        try {
            
            dtoList.forEach(async(dto) => {  
                // const oProducto2 = await ProductoRepository.findByCodigo(dto.codigoProducto);
                let oMovimiento = new Movimiento(dto);
                oMovimiento.usuarioRegistro = authSession.username;
                oMovimiento.fecha = getFecha(new Date())
                const oProducto = await ProductoRepository.findByCodigo(dto.codigoProducto);
                if(oProducto!=undefined){
                    oMovimiento.monto = oProducto.monto;
                    oMovimiento.codProducto = oProducto.id;
                    oMovimiento.descuento = oProducto.descuento;
                    oMovimiento = await MovmientoRepository.save(oMovimiento);
                   
                    
                }else{
                    res.message = `El producto ${dto.codigoProducto} no existe`;
                }
            });
            res.data = dtoList;
            
        } catch (error) {
            res.success = false;
            res.message = "Error de registro";
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