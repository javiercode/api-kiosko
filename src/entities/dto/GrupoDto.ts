export interface GrupoDto {
    nombre:string,
    privacidad:string,
    tipo:string,
    clave:string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface GrupoEditDto {
    nombre:string,
    privacidad:string,
    tipo:string,
    clave:string,
    usurioModificacion?:string,
    fechaModificacion?:Date 
}

export const GrupoRegex: GrupoDto = {
    nombre: "^[a-zA-Z0-9_]{3,300}$",
    tipo: "^[A-Z]{1}$",
    privacidad: "^[a-zA-Z0-9]{1,3}$",
    clave:"^[a-zA-Z0-9]{3,300}$",
};