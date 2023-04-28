export interface ApuestaDto {
    codPartido:number,
    codRolUser:number,
    local:number,
    visitante:number,
    localPenal:number,
    visitantePenal:number,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface ApuestaEditDto {
    codPartido:number,
    codRolUser:number,
    local:number,
    visitante:number,
    localPenal:number,
    visitantePenal:number,
    usurioModificacion?:string,
    fechaModificacion?:Date 
}

export interface OApuestaRegex {
    codPartido:string,
    codRolUser:string,
    local:string,
    visitante:string,
    localPenal:string,
    visitantePenal:string
};
export const ApuestaRegex: OApuestaRegex = {
    codPartido:"^[a-fA-F0-9]{20,50}$",
    codRolUser:"^[a-fA-F0-9]{20,50}$",
    local:"^[0-9]{1,2}$",
    visitante:"^[0-9]{1,2}$",
    localPenal:"^[0-9]{1,2}$",
    visitantePenal:"^[0-9]{1,2}$",
};