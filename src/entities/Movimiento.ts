import {Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoEnum } from '../configs/Config.enum';
import { MovimientoDto } from './dto/MovimientoDto';
import { Producto } from './Producto';

@Entity('movimiento')
export class Movimiento{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:"COD_PRODUCTO"})
    codProducto:number

    @Column({name:"FECHA"})
    fecha:Date

    @Column({name:"MONTO",precision:10,scale:2,type:'numeric'})
    monto:number

    @Column({name:"DESCUENTO",precision:10,scale:2,type:'numeric'})
    descuento:number

    @Column({name:"ESTADO",default: EstadoEnum.ACTIVO, length:1})
    estado:string

    @CreateDateColumn({name:"FECHA_REGISTRO"})
    fechaRegistro:Date

    @Column({name:"FECHA_MODIFICACION",nullable:true})
    fechaModificacion:Date
    
    @Column({name:"USUARIO_REGISTRO",length:50})
    usuarioRegistro:string

    @Column({name:"USUARIO_MODIFICACION", length:50,nullable:true})
    usuarioModificacion:string

    @ManyToOne(() => Producto, (producto) => producto.movimientos)
    @JoinColumn({name:'COD_PRODUCTO', referencedColumnName:'id'})
    producto: Producto
    
    constructor(params: MovimientoDto = {} as MovimientoDto){
        if(params.codProducto){
            this.codProducto = params.codProducto
        }
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}