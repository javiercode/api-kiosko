import { JwtPayload } from '../entities/dto/GeneralDto';
import { ProductoDto } from '../entities/dto/ProductoDto';
import { Producto} from '../entities/Producto';
import ProductoRepository from '../repositories/Producto.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IProducto from './interfaces/IPartido.interface';
import QRCode from 'qrcode'

class ProductoService implements IProducto {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }

    async getQR(id: number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        try {
            const dtoFind = await ProductoRepository.findById(id) as Producto;
            if(dtoFind){
                res.message="Restulado exitoso";
                res.data=await QRCode.toDataURL(dtoFind.codigo);
            }
        } catch (error) {
            console.error(error)
        }
        return res;
    }

    async getCodigo(codigo: string): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        try {
            const dtoFind = await ProductoRepository.findByCodigo(codigo) as Producto;
            if(dtoFind){
                res.data=dtoFind;
                res.message="Restulado exitoso";
            }
        } catch (error) {
            console.error(error)
        }
        return res;
    }

    async getQRImg(id: number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        try {
            const dtoFind = await ProductoRepository.findById(id) as Producto;
            if(dtoFind){
                res.data=await QRCode.toBuffer(dtoFind.codigo);
            }
        } catch (error) {
            console.error(error)
        }
        return res;
    }


    async listAll(page:number, limit:number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await ProductoRepository.listAll(page,limit);
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            console.error(error);
        }

        return res;
    }

    async findByDate(fecha:string): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            const data = await ProductoRepository.findByDate(getFecha(fecha));
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

    async edit(id: number, dto: ProductoDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await ProductoRepository.findById(id) as Producto;
            const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind || !(isActive)) {
                res.message = "Partido no encontrado!";
            } else {
                res.success = true;
                res.message = "Partido actualizado!";

                // dto.fechaModificacion = getFecha(new Date());
                await ProductoRepository.actualizar(id, dto);
                res.data = dto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: ProductoDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            let oPartido = new Producto(dto);
            oPartido.usuarioRegistro = authSession.username;
            oPartido.fechaRegistro = getFecha(new Date())
            const oPartidoFind = await ProductoRepository.findByDto(oPartido);

            if(!oPartidoFind){
                oPartido = await ProductoRepository.save(oPartido);
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

    async desactivar(idUser: number, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await ProductoRepository.findById(idUser);
            if (userDtoFind) {
                ProductoRepository.desactivar(idUser);
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

export default new ProductoService();