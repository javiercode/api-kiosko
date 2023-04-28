import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { GrupoDto } from './dto/GrupoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('grupo')
export class Grupo{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number

    @Column({name:"COD_PARTIDO"})
    codPartido:number;

    @Column({name:"NOMBRE",length:200})
    @Index({ unique: true })
    nombre:string

    @Column({name:"PRIVACIDAD",length:1})
    privacidad:string

    @Column({name:"CLAVE",length:200})
    clave:string

    @Column({name:"TIPO",length:1})
    tipo:string

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
    
    constructor(params: GrupoDto = {} as GrupoDto){
        this.nombre=params.nombre;
        this.privacidad=params.privacidad;
        this.tipo=params.tipo;
        this.clave=params.clave;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}