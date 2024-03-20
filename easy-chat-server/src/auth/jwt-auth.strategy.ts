import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";


export interface IJwtPayload{
    username:string;
}

@Injectable()
export default class JwtAuthStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwtConstants.secret
        })
    }

    async validate(payload:IJwtPayload){
        console.log(payload,'========>payload');
        const { username } = payload;
        return {
            username
        }
    }
}