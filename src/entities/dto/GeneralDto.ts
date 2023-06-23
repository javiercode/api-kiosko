export interface JwtPayload {
    username: string,
    name: string,
    rol: string[],
    aRolId: string[],
    aSucursal: number[],
    sucursal: number,
    foto: string,
    activo: Boolean,
}

export interface MessageResponse {
    success: boolean,
    message: string,
    code: number,
    data?:any,
    total?:number,
    suma?:number,
}

export interface LoginResponce {
    success: boolean,
    message: string,
    token: string,
}

export interface ListPaginate {
    data: any[],
    count: number
}

export interface DataPaginate {
    data: any[],
    count: number,
    sum?: number
}
