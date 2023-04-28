import {MessageResponse} from '../../entities/dto/GeneralDto';

export interface IRolUser {
    test: (authSession:any) => Promise<any>;
    list: (limit: number, page: number,authSession:any) => Promise<any>;
    create: (userDto: any,authSession:any) => Promise<any>;
    edit: (id:string,userDto: any,authSession:any)=> Promise<MessageResponse>;
}