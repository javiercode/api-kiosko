import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EquipoDto } from './dto/EquipoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('equipo')
export class Equipo{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number

    @Column({name:"NOMBRE",length:200})
    @Index({ unique: true })
    nombre:string

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
    
    constructor(params: EquipoDto = {} as EquipoDto){
        this.nombre=params.nombre;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}