export interface PartidoDto {
    codLocal: number,
    codVisitante: number,
    fecha: Date,
    marcadorLocal: number,
    marcadorVisitante: number,
    penalesLocal: number,
    penalesVisitante: number
}

export interface PartidoEditDto {
    codLocal: number,
    codVisitante: number,
    fecha: Date,
    marcadorLocal: number,
    marcadorVisitante: number,
    penalesLocal: number,
    penalesVisitante: number
    usurioModificacion?:string
    sucursalModificacion?:number
    fechaModificacion?:Date 
}