import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductoQRDto } from './dto/ProductoQRDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('producto-qr')
export class ProductoQR{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:"COD_PRODUCTO"})
    codProducto: number

    @Column({name:"CODIGO"})
    codigo: string

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

    constructor(params: ProductoQRDto = {} as ProductoQRDto){
        this.codProducto= (params.codProducto);
        this.codigo= (params.codigo);
        this.estado = this.estado || EstadoEnum.ACTIVO;
        this.usuarioRegistro = params.usuarioRegistro||"";
    }
}