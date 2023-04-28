import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { GrupoDto } from "../entities/dto/GrupoDto";
import { ObjectID } from "mongodb";
import { Grupo } from "../entities/Categoria";


class RolRepository {
    private repository = MysqlDataSource.getRepository(Grupo);

    public async  findByDto (params: GrupoDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findById (params: string): Promise<Grupo | null>{    
        let options={}
        options = {
            where: {
                _id: new ObjectID(params)
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async findByNombre (params: string): Promise<Grupo | null>{    
        let options={}
        options = {
            where: {
                nombre: params
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async  findByINId (params: string[]): Promise<Grupo[]>{    
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
    
    public async  actualizar (id:string, param: GrupoDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: Grupo): Promise<DeleteResult>{
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
        const [result,total] = await this.repository.findAndCount(options);        
        return {
            data: result,
            count: total
        }
    };

    public async save(params: Grupo): Promise<Grupo> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new RolRepository();
