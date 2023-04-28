import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { PartidoDto } from './dto/PartidoDto';
import { EstadoEnum } from '../configs/Config.enum';
import { Equipo } from './Equipo';

@Entity('producto')
export class Producto{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number

    @Column({name:"LOCAL"})
    codLocal: number

    @Column({name:"VISITANTE"})
    codVisitante: number

    @Column({name:"FECHA"})
    fecha: Date

    @Column({name:"MARCADOR_LOCAL",nullable:true})
    marcadorLocal: number

    @Column({name:"MARCADOR_VISITANTE",nullable:true})
    marcadorVisitante: number

    @Column({name:"PENALES_LOCAL",nullable:true})
    penalesLocal: number

    @Column({name:"PENALES_VISITANTE",nullable:true})
    penalesVisitante: number

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

    @OneToOne(() => Equipo)
    @JoinColumn({name:'LOCAL'})
    local: Equipo

    @OneToOne(() => Equipo)
    @JoinColumn({name:'VISITANTE'})
    visitante: Equipo
    
    constructor(params: PartidoDto = {} as PartidoDto){
        this.codLocal= (params.codLocal);
        this.codVisitante= (params.codVisitante);
        this.fecha= params.fecha;
        this.marcadorLocal= params.marcadorLocal;
        this.marcadorVisitante= params.marcadorVisitante;
        this.penalesLocal= params.penalesLocal;
        this.penalesVisitante= params.penalesVisitante;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}