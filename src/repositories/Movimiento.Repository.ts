import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import {MysqlDataSource} from "../configs/db";
import { DataPaginate, ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { MovimientoDto } from "../entities/dto/MovimientoDto";
import { Movimiento } from "../entities/Movimiento";


class MovmientoRepository {
    private repository = MysqlDataSource.getRepository(Movimiento);

    public async  findByDto (params: MovimientoDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findById (params: string): Promise<Movimiento | null>{    
        let options={}
        options = {
            where: {
                _id: params
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async findByNombre (params: string): Promise<Movimiento | null>{    
        let options={}
        options = {
            where: {
                nombre: params
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async  findByINId (params: string[]): Promise<Movimiento[]>{    
        let options={}
        options={
            where: {
                firstName: { $in: params },
            },   
        }
            
        const result = await this.repository.find(options);        
        return result
    };
    
    public async  desactivar (id: string){
        const firstUser = await this.repository.update(id,{estado: EstadoEnum.ELIMINADO});
        return firstUser;
    };
    
    public async  actualizar (id:string, param: MovimientoDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: Movimiento): Promise<DeleteResult>{
        let options={}
        options={params}
        const firstUser = await this.repository.delete(options);
        return firstUser;
    };


    public async  listAll (page:number,limit:number): Promise<DataPaginate>{
        let options={}
        options={
            where:{
                estado:EstadoEnum.ACTIVO,
            }
        }
        const { sum, count } = await this.repository
            .createQueryBuilder("mov")
            .select("SUM(mov.descuento)", "sum")
            .addSelect("COUNT(mov.id)", "count")
            .where("mov.estado = :estado", { estado: EstadoEnum.ACTIVO })
            .getRawOne();
        // const suma =this.repository.sum(options);

        const restult = await this.repository.createQueryBuilder("mov")
            .innerJoinAndSelect("mov.producto","p")
            .where("mov.estado=:estado",{estado:EstadoEnum.ACTIVO})
            .skip(page*limit)
            .take(limit)
            .orderBy("mov.id","DESC")
            .getMany();      
        return {
            data: restult,
            count: count,
            sum:sum?sum:0
        }
    };

    public async save(params: Movimiento): Promise<Movimiento> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new MovmientoRepository();