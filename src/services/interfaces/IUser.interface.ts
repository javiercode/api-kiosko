import {MessageResponse} from '../../entities/dto/GeneralDto';

export interface IUser {
    list: (limit: number, page: number) => Promise<any>;
    create: (userDto: any) => Promise<any>;
    edit: (id:string,userDto: any)=> Promise<MessageResponse>;
    desactivar: (id:string)=> Promise<MessageResponse>;
    getUsuario: (usuario: string)=> Promise<string>;
}