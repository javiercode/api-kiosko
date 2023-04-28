import {MessageResponse} from '../../entities/dto/GeneralDto';

export interface IRol {
    test: (authSession:any) => Promise<any>;
    listAll: (limit: number, page: number,authSession:any) => Promise<any>;
}