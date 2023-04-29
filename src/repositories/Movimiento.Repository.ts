import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { MovimientoDto } from "../entities/dto/MovimientoDto";
import { ObjectID } from "mongodb";
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
                _id: new ObjectID(params)
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


    public async  listAll (): Promise<ListPaginate>{
        let options={}
        options={
            where:{
                estado:EstadoEnum.ACTIVO,
            }
        }
        const total = await this.repository.count(options);        
        const result = await this.repository.createQueryBuilder("mov")
            .innerJoin("mov.producto","p")
            .getMany();
        // const [result,total] = await this.repository.findAndCount(options);        
        return {
            data: result,
            count: total
        }
    };

    public async save(params: Movimiento): Promise<Movimiento> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new MovmientoRepository();