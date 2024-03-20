import { SUCCESS,FAIL } from "./codes";
export class CResponse<T>{
    constructor(
       public data:T,
       public message: string,
       public code:number,
    ){}

    static success<T>(data:T,message:string="success",code:number=SUCCESS):CResponse<T>{
        return new CResponse(data,message,code);
    }
    static fail<T>(data:T,message:string="fail",code:number=FAIL):CResponse<T>{
        return new CResponse(data,message,code);
    }
}