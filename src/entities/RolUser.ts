import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne,OneToMany, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import { RolUserDto } from './dto/RolUserDto';
import { EstadoEnum } from '../configs/Config.enum';
import { Grupo } from './Categoria';
import { Rol } from './Rol';
import { User } from './User';

@Entity('rol_user')
export class RolUser {

    @PrimaryGeneratedColumn({name:"ID"})
    public id: number;

    @Column({name:"COD_ROL"})
    codRol:number;

    @Column({name:"COD_USUARIO"})
    codUsuario:number;

    @Column({name:"COD_GRUPO"})
    codGrupo:number;
    
    @Column({name:"ESTADO",default: EstadoEnum.PENDIENTE,length:1})
    estado:string

    @CreateDateColumn({name:"FECHA_REGISTRO"})
    fechaRegistro:Date

    @Column({name:"FECHA_MODIFICACION",nullable:true})
    fechaModificacion:Date
    
    @Column({name:"USUARIO_REGISTRO",length:50})
    usuarioRegistro:string

    @Column({name:"USUARIO_MODIFICACION", length:50,nullable:true})
    usuarioModificacion:string

    /*@OneToOne(() => Grupo)
    @JoinColumn({name:'COD_GRUPO'})
    grupo: Grupo

    @OneToOne(() => Rol)
    @JoinColumn({name:'COD_ROL'})
    rol: Rol

    @OneToOne(() => User)
    @JoinColumn({name:'COD_USUARIO'})
    user: User*/

    constructor(params: RolUserDto = {} as RolUserDto){
        this.usuarioRegistro = params.usuarioRegistro || this.usuarioRegistro;
        this.estado = this.estado || EstadoEnum.ACTIVO;  
    }
}