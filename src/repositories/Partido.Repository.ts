import { Between, DeleteResult, EntityRepository, LessThanOrEqual, Repository, UpdateResult } from "typeorm";
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { PartidoDto } from "../entities/dto/PartidoDto";
import { ObjectID } from "mongodb";
import { Producto } from "../entities/Producto";
import { getFecha } from "../configs/General.functions";

class PartidoRepository {
    private repository = MysqlDataSource.getRepository(Producto);

    public async  findByDto (params: PartidoDto | Producto): Promise<Producto |null>{
        let options={}
        options={
            where: {
                local: params.codLocal,
                visitante: params.codVisitante,
                fecha:params.fecha,
                estado: EstadoEnum.ACTIVO
            },
        }
        
        const result = await this.repository.findOne(options);
        return result;
    };

    public async  findById (params: string): Promise<Producto | null>{    
        let options={}
        options = {
            where: {
                _id: new ObjectID(params)
            },
        };
        const result = await this.repository.findOne(options);
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
    
    public async  desactivar (id: string){
        const firstUser = await this.repository.update(id,{estado: EstadoEnum.ELIMINADO});
        return firstUser;
    };
    
    public async  actualizar (id:string, param: PartidoDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: Producto): Promise<DeleteResult>{
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

    public async findAllByDate (fecha: Date): Promise<ListPaginate>{
        let options={}
        var startDate = getFecha(fecha);
        startDate.setHours(0, 0, 0, 0);
        var endDate = getFecha(fecha);
        endDate.setHours(23, 59, 59, 999);
        const [result,total] = await this.repository.findAndCount({
            where:{
                fecha:Between(startDate,endDate),
            },
            
        });        
        return {
            data: result,
            count: total
        }
    };

    public async  findByDate (fecha:Date): Promise<Producto[]>{
        var startDate = getFecha(fecha);
        startDate.setHours(0, 0, 0, 0);
        var endDate = getFecha(fecha);
        endDate.setHours(23, 59, 59, 999);

        const rolUsers = await this.repository
            .createQueryBuilder("Partido")
            .leftJoinAndSelect("Partido.local", "local")
            .leftJoinAndSelect("Partido.visitante", "visitante")
            .where("Partido.fecha >= :startDate", { startDate: startDate })
            .andWhere("Partido.fecha <= :endDate", { endDate: endDate })
            .getMany();
        return rolUsers;
    };

    public async findMoreDate (fecha:Date): Promise<Producto[]>{
        var startDate = getFecha(fecha);
        startDate.setHours(0, 0, 0, 0);

        const rolUsers = await this.repository
            .createQueryBuilder("Partido")
            .leftJoinAndSelect("Partido.local", "local")
            .leftJoinAndSelect("Partido.visitante", "visitante")
            .where("Partido.fecha >= :startDate", { startDate: startDate })
            .getMany();
        return rolUsers;
    };

    public async save(params: Producto): Promise<Producto> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new PartidoRepository();