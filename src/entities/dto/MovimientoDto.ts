export interface MovimientoDto {
    codigoProducto:string,
    codProducto?:number,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface OApuestaRegex {
    codProducto:string
};
export const ApuestaRegex: OApuestaRegex = {
    codProducto:"^[0-9]{1,2}$",
};