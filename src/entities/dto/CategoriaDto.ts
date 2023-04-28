export interface CategoriaDto {
    nombre:string,
    tipo:string,
    usuarioRegistro?: string,
    fechaRegistro?: Date
}

export const GrupoRegex: CategoriaDto = {
    nombre: "^[a-zA-Z0-9_]{3,300}$",
    tipo: "^[A-Z]{1}$",
};