export interface createRolUserDto {
    codRolAplicacion: string,
    usuario: string,
    sucursal: number
}

export interface rolUserDtoParcial {
    usuario: string,
    codRolAplicacion: string
}

export interface editRolUser {
    id: number,
    idRol: number,
    usuario: string,
    sucursal: number
}

export interface createRolUserDto {
    codRolAplicacion: string,
    usuario: string,
    sucursal: number
}

export interface createRolUserForm {
    codRolAplicacion: string,
    usuario: string,
    sucursal: string
}

export interface UserDto {
    username:string,
    nombre:string,
    correo:string,
    password:string,
    codFacebook?:string,
    type?:'dto'
}

export interface UserEditDto {
    username:string,
    nombre:string,
    correo:string,
    codFacebook?:string,
    estado?:string,
    fechaModificacion?:Date,
    type?:'edit'
}

export interface UserEditPassDto {
    password:string,
    fechaModificacion?:Date,
}

export const UserRegex: UserDto = {
    username:"^[a-zA-Z0-9]{3,30}$",
    nombre:"^[a-zA-ZÀ-ÿ ]{3,30}$",
    correo:"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
    password:"^[\\w\\W\\d\\D\\t\\n]{6,30}$",
    codFacebook:"^[\\w\\W\\d\\D\\t\\n]{0,30}$",
};