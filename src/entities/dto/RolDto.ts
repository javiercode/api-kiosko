export interface RolDto {
    codigo:string,
    descripcion:string,
    jerarquia:number,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface RolEditDto {
    codigo:string,
    descripcion:string,
    jerarquia:number,
    usurioModificacion?:string,
    fechaModificacion?:Date 
}

export interface RolDtoForm {
    codigo:string,
    descripcion:string,
    jerarquia:string,
}

export const RolRegex: RolDtoForm = {
    codigo: "^[a-zA-Z0-9_]{3,10}$",
    descripcion: "^[a-fA-F0-9]{3,300}$",
    jerarquia: "^[0-9]{1,3}$",
};