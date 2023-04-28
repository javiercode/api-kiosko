export interface SessionDto {
    id:number,
    codigo:string,
    username:string,
    rol:string,
    correo:string,
    grupo:string,
    tipo:string,
    privacidad:string,
    codPartido:string
}

export interface RolUserDto {
    rol:string,
    usuario:string,
    grupo:string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface RolUserEditDto {
    rol:string,
    usuario:string,
    grupo:string,
    usurioModificacion?:string
    fechaModificacion?:Date 
}

export const RolUserRegex: RolUserDto = {
    rol: "^[a-zA-Z0-9_]{3,10}$",
    usuario: "^[a-zA-ZÀ-ÿ ]{3,30}$",
    grupo: "^[a-zA-Z0-9_]{3,100}$",
};