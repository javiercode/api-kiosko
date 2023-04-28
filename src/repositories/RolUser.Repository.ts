import { createQueryBuilder, DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { RolUser } from "../entities/RolUser";
import { SessionDto, RolUserDto } from "../entities/dto/RolUserDto"
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { ObjectID } from "mongodb";
import { EstadoEnum } from "../configs/Config.enum";
import UserRepository from "./User.Repository";
import { Grupo } from "../entities/Categoria";


class RolUserRepository {
    private repository = MysqlDataSource.getRepository(RolUser);

    public async  findByUser (username: string): Promise<ListPaginate |null>{
        const oUser = await UserRepository.findByUsername(username);

        let options={}
        options={
            where:{
                codUsuario:oUser?.id,
                estado:EstadoEnum.ACTIVO,
            }
        }

        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };
    public async  findByDtoCount (params: RolUserDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findByDto (params: RolUser): Promise<RolUser | null>{
        let options={}
        options={
            where:{
                codRol:(params.codRol),
                codUsuario:(params.codUsuario),
                codGrupo:(params.codGrupo),
                estado:EstadoEnum.ACTIVO,
            }
        }
        const result = await this.repository.findOne(options);
        
        return result;
    }

    public async  findById (params: string): Promise<RolUser | null>{    
        let options={}
        options = {
            where: {
                _id: new ObjectID(params)
            },
        };
        const result = await this.repository.findOne(options);
        
        return result
    };

     public async  findDetalleByUser (params: string): Promise<SessionDto[]>{
         const query:SessionDto[] = await this.repository.manager.query(`
            select ru.id, r.codigo as rol, u.correo, g.nombre as grupo, g.tipo, 
                g.privacidad, g.COD_PARTIDO as codPartido,u.username
            from rol_user ru inner join user u on ru.COD_USUARIO = u.ID
            inner join rol r on ru.COD_ROL = r.ID 
            inner join grupo g on ru.COD_GRUPO = g.ID 
            where ru.ESTADO !='${EstadoEnum.ELIMINADO}' and r.ESTADO !='${EstadoEnum.ELIMINADO}' and u.ESTADO !='${EstadoEnum.ELIMINADO}' and g.ESTADO !='${EstadoEnum.ELIMINADO}' 
            and u.USERNAME = '${params}';
            `);
        
         return query;
     };

    public async  findGrupoByUser (params:string): Promise<Grupo[]>{
        const rolUsers = await this.repository
            .createQueryBuilder("RolUser")
            //.createQueryBuilder("user")
            .leftJoinAndSelect("RolUser.grupo", "grupo")
            .leftJoinAndSelect("RolUser.user", "user")
            //.where("RolUser.codUsuario = :codUser", { codUser: params })
            .where("user.username = :codUser", { codUser: params })
            .getMany();

        /*return rolUsers.map(tes=>{
            return tes.grupo;
        })*/
        return []
    };
    
    public async  findAllByUser (params:string): Promise<RolUser[]>{
        const rolUsers = await this.repository
            .createQueryBuilder("RolUser")
            .leftJoinAndSelect("RolUser.grupo", "grupo")
            .leftJoinAndSelect("RolUser.user", "user")
            .leftJoinAndSelect("RolUser.rol", "rol")
            .where("user.username = :codUser", { codUser: params })
            .getMany();

        return rolUsers;
    };
    
    public async  desactivar (userId: string){       
        let options={}
        options={userId}
        const firstUser = await this.repository.update(options,{estado:EstadoEnum.ACTIVO});
        return firstUser;
    };
    
    public async  actualizar (userId:string, param: RolUser){
        let options={}
        options={userId}
        const firstUser = await this.repository.update(options,param);
        return firstUser;
    };
    
    public async  deleteUser (params: RolUser): Promise<DeleteResult>{
        let options={}
        options={params}
        const firstUser = await this.repository.delete(options);
        return firstUser;
    };
    
    public async  existeUsuario (params: string): Promise<RolUser|null>{    
        let options={}
        options={
            where:{user:params}}
        const result = await this.repository.findOne(options);

        return result
    };


    public async  listAll (limit:number, page:number): Promise<ListPaginate>{
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

    public async listBySucursales (limit:number,page:number,params: string): Promise<ListPaginate>{    
        return {
            data: [],
            count: 0
        }
    };

    public async save(params: RolUser): Promise<RolUser> {
        const oRol = await this.repository.save(params);
        return oRol;
    };
}
export default new RolUserRepository();