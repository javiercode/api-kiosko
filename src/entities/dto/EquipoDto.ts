export interface EquipoDto {
    nombre:string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface EquipoEditDto {
    nombre:string,
    usurioModificacion?:string,
    fechaModificacion?:Date 
}

export const EquipoRegex: EquipoDto = {
    nombre: "^[a-zA-Z0-9 ]{3,300}$",
};