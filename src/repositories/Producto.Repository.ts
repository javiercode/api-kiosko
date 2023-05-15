import { Between, DeleteResult, EntityRepository, LessThanOrEqual, Repository, UpdateResult } from "typeorm";
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { ProductoDto } from "../entities/dto/ProductoDto";
import { Producto } from "../entities/Producto";
import { getFecha } from "../configs/General.functions";

class ProductoRepository {
    private repository = MysqlDataSource.getRepository(Producto);

    public async  findByDto (params: ProductoDto | Producto): Promise<Producto |null>{
        let options={}
        options={
            where: {
                codCategoria: params.codCategoria,
                marca: params.codMarca,
                nombre:params.nombre,
                estado: EstadoEnum.ACTIVO
            },
        }
        
        const result = await this.repository.findOne(options);
        return result;
    };

    public async  findById (params: number): Promise<Producto | null>{    
        let options={}
        options = {
            where: {
                _id: params
            },
        };
        const result = await this.repository.findOneById(params);
        return result
    };

    public async findByNombre (params: string): Promise<Producto | null>{    
        let options={}
        options = {
            where: {
                nombre: params
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async findByCodigo (params: string): Promise<Producto | null>{    
        let options={}
        options = {
            where: {
                codigo: params
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async  findByINId (params: string[]): Promise<Producto[]>{    
        let options={}
        options={
            where: {
                firstName: { $in: params },
            },   
        }
            
        const result = await this.repository.find(options);        
        return result
    };
    
    public async  desactivar (id: number){
        const firstUser = await this.repository.update(id,{estado: EstadoEnum.ELIMINADO});
        return firstUser;
    };
    
    public async  actualizar (id:number, param: ProductoDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: Producto): Promise<DeleteResult>{
        let options={}
        options={params}
        const firstUser = await this.repository.delete(options);
        return firstUser;
    };


    public async  listAll (page:number, limit:number): Promise<ListPaginate>{
        let options={}
        options={
            where:{
                estado:EstadoEnum.ACTIVO,
            }
        }
        const [result,count] = await this.repository.createQueryBuilder("prod")
        // .innerJoinAndSelect("mov.producto","p")
        .where("prod.estado=:estado",{estado:EstadoEnum.ACTIVO})
        .skip(page*limit)
        .take(limit)
        .orderBy("prod.nombre","ASC")
        .getManyAndCount();
        return {
            data: result,
            count: count
        }
    };

    public async findAllByDate (fecha: Date): Promise<ListPaginate>{
        let options={}
        var startDate = getFecha(fecha);
        startDate.setHours(0, 0, 0, 0);
        var endDate = getFecha(fecha);
        endDate.setHours(23, 59, 59, 999);
        const [result,total] = await this.repository.findAndCount({
            where:{
                // fecha:Between(startDate,endDate),
            },
            
        });        
        return {
            data: result,
            count: total
        }
    };

    public async save(params: Producto): Promise<Producto> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new ProductoRepository();