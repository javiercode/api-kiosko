import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { RolDto } from './dto/RolDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('rol')
export class Rol{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number;

    @Column({name:"CODIGO",length:5})
    @Index({ unique: true })
    codigo:string

    @Column({name:"DESCRIPCION",length:100})
    descripcion:string

    @Column({name:"JERARQUIA"})
    jerarquia:number

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
    
    constructor(params: RolDto = {} as RolDto){
        this.codigo=params.codigo;
        this.descripcion=params.descripcion;
        this.jerarquia=params.jerarquia;
        this.estado = this.estado || EstadoEnum.ACTIVO; 
        
    }
}