import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, Unique, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from './dto/UserDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('user')
export class User{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number;

    @Column({name:"USERNAME",length:50})
    @Index({ unique: true })
    username:string

    @Column({name:"NOMBRE",length:200})
    nombre:string

    @Column({name:"CORREO",length:100})
    correo:string

    @Column({name:"COD_FACEBOOK",length:300})
    codFacebook:string

    @Column({name:"PASSWORD",length:300})
    password:string

    @Column({name:"ESTADO",default: EstadoEnum.ACTIVO,length:1})
    estado:string

    @CreateDateColumn({name:"FECHA_REGISTRO"})
    fechaRegistro:Date

    @Column({name:"FECHA_MODIFICACION",nullable:true})
    fechaModificacion:Date
    
    @Column({name:"USUARIO_REGISTRO",length:50})
    usuarioRegistro:string

    @Column({name:"USUARIO_MODIFICACION", length:50,nullable:true})
    usuarioModificacion:string
    
    constructor(params: UserDto = {} as UserDto){
        this.username=params.username;
        this.correo=params.correo;
        this.nombre=params.nombre;
        this.password=params.password;
        this.codFacebook=params.codFacebook || "";
        this.estado = this.estado || EstadoEnum.ACTIVO;       
    }
}