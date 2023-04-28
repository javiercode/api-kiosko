import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaDto } from './dto/CategoriaDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('categoria')
export class Categoria{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:"NOMBRE",length:200})
    @Index({ unique: true })
    nombre:string

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
    
    constructor(params: CategoriaDto = {} as CategoriaDto){
        this.nombre=params.nombre;
        this.tipo=params.tipo;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}