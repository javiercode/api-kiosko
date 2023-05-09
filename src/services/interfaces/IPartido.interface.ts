import {MessageResponse} from '../../entities/dto/GeneralDto';

export default interface IProducto {
    test: (authSession:any) => Promise<any>;
    listAll: (limit: number, page: number,authSession:any) => Promise<any>;
    create: (dto: any,authSession:any) => Promise<any>;
    edit: (id:number,dto: any,authSession:any)=> Promise<MessageResponse>;
}