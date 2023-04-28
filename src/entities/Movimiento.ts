import {Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoEnum } from '../configs/Config.enum';
import { ApuestaDto } from './dto/ApuestaDto';

@Entity('apuesta')
export class Apuesta{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:"COD_PARTIDO"})
    codPartido:number

    @Column({name:"COD_ROL_USER"})
    codRolUser:number

    @Column({name:"LOCAL"})
    local:number

    @Column({name:"VISITANTE"})
    visitante:number

    @Column({name:"LOCAL_PENAL"})
    localPenal:number

    @Column({name:"VISITANTE_PENAL"})
    visitantePenal:number

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
    
    constructor(params: ApuestaDto = {} as ApuestaDto){
        this.codPartido = (params.codPartido);
        this.codRolUser = (params.codRolUser);
        this.local = params.local;
        this.visitante = params.visitante;
        this.localPenal = params.localPenal;
        this.visitantePenal = params.visitantePenal;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}