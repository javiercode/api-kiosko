import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { CategoriaDto } from "../entities/dto/CategoriaDto";
import { Categoria } from "../entities/Categoria";


class CategoriaRepository {
    private repository = MysqlDataSource.getRepository(Categoria);

    public async  findByDto (params: CategoriaDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findById (params: string): Promise<Categoria | null>{    
        let options={}
        options = {
            where: {
                _id: (params)
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async findByNombre (params: string): Promise<Categoria | null>{    
        let options={}
        options = {
            where: {
                nombre: params
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async  findByINId (params: string[]): Promise<Categoria[]>{    
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
    
    public async  actualizar (id:string, param: CategoriaDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: Categoria): Promise<DeleteResult>{
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
            },
        }
        const [result,total] = await this.repository.findAndCount(options);        
        return {
            data: result,
            count: total
        }
    };

    public async save(params: Categoria): Promise<Categoria> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new CategoriaRepository();
