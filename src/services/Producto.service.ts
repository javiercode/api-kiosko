import { JwtPayload } from '../entities/dto/GeneralDto';
import { ProductoDto } from '../entities/dto/ProductoDto';
import { Producto} from '../entities/Producto';
import ProductoRepository from '../repositories/Producto.Repository';
import ProductoQRRepository from '../repositories/ProductoQR.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IProducto from './interfaces/IPartido.interface';
import QRCode from 'qrcode'
import { ProductoQR } from '../entities/ProductoQR';

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
            const aProductoQR = codigo.split("|");
            const dtoFind = await ProductoRepository.findByCodigo(aProductoQR[1]) as Producto;
            if(dtoFind){
                res.data=dtoFind;
                res.message="Restulado exitoso";
            }
        } catch (error) {
            console.error(error)
        }
        return res;
    }

    async getQRImg(id: number,authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        try {
            const dtoFind = await ProductoRepository.findById(id) as Producto;
            const productoQR:ProductoQR = new ProductoQR({codigo:dtoFind.codigo,codProducto:dtoFind.id,usuarioRegistro:authSession.username})
            const oProductoQR = await ProductoQRRepository.save(productoQR);
            if(dtoFind){
                res.data=await QRCode.toBuffer(oProductoQR.id.toString()+"|"+oProductoQR.codigo);
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
            let oProducto = new Producto(dto);
            oProducto.usuarioRegistro = authSession.username;
            oProducto.fechaRegistro = getFecha(new Date())
            const oPartidoFind = await ProductoRepository.findByDto(oProducto);

            if(!oPartidoFind){
                oProducto = await ProductoRepository.save(oProducto);
                oProducto.codigo = oProducto.marca+"-"+oProducto.id;
                oProducto = await ProductoRepository.save(oProducto);
                res.success = true;
                res.message = "Producto registrado";
                res.data = oProducto;
            }else{
                res.message = "Producto duplicado";
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