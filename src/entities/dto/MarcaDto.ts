export interface MarcaDto {
    nombre:string,
    tipo:string,
    usuarioRegistro?: string,
    fechaRegistro?: Date
}

export const GrupoRegex: MarcaDto = {
    nombre: "^[a-zA-Z0-9_ ]{3,300}$",
    tipo: "^[a-zA-Z0-9_ ]{3,300}$",
};