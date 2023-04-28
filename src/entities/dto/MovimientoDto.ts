export interface MovimientoDto {
    codProducto:number,
    fecha:Date,
    monto:number,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface OApuestaRegex {
    codProducto:string,
    fecha:string,
    monto:string
};
export const ApuestaRegex: OApuestaRegex = {
    codProducto:"^[a-fA-F0-9]{20,50}$",
    fecha:"^[a-fA-F0-9]{20,50}$",
    monto:"^[0-9]{1,2}$",
};