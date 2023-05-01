import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductoDto } from './dto/ProductoDto';
import { EstadoEnum } from '../configs/Config.enum';
import { Movimiento } from './Movimiento';

@Entity('producto')
export class Producto{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:"NOMBRE"})
    nombre: string

    @Column({name:"COD_CATEGORIA"})
    codCategoria: number

    @Column({name:"CODIGO"})
    codigo: string

    @Column({name:"MARCA"})
    marca: string

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

    @OneToMany(() => Movimiento, (movimiento) => movimiento.producto)
    movimientos: Movimiento[]

    constructor(params: ProductoDto = {} as ProductoDto){
        this.nombre= (params.nombre);
        this.codCategoria= (params.codCategoria);
        this.codigo= (params.codigo);
        this.marca= params.marca;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}