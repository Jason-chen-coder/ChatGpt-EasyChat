import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NV_Users } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { ApiException ,CODES} from 'src/common/exception';
import { Response } from 'express'
@Injectable()
export class AuthService {
    constructor(@InjectRepository(NV_Users) private readonly user:Repository<NV_Users>,
    private readonly JwtService: JwtService
    ) {}

    async signUp(singUpData:CreateAuthDto){
        const findUser = await this.user.findOne({where:{
            username:singUpData.username
        }});
        if(findUser && singUpData.username == findUser.username){
            throw new ApiException(CODES.AUTH.USER_EXIST,'该用户已存在！');
            // return '该用户已存在！'
        }
        // 加密密码；bcryptjs.hashSync()方法是对用户密码进行加密用的，hashSync()方法第一个参数为用户密码，第二个为密码盐(简单理解为加密的程度)。
        singUpData.password = bcryptjs.hashSync(singUpData.password,10)
        await this.user.save(singUpData);
        return '注册成功！'
    }

    async login(loginData:CreateAuthDto,response:Response){
        const findUser = await this.user.findOne({where:{
            username:loginData.username
        }})
        if(!findUser){
            throw new ApiException(CODES.AUTH.USER_NOT_EXIST,'该用户不存在！');
        }
        // 对用户的密码和加密后的密码进行比较的，如果正确返回true，错误则返回fasle,第一个参数为登录时用户输入的密码，第二个为查出来的加密后的密码。加密密码的方法是不可逆的，也就是没有解密的功能，这样做也是保证用户的安全。
        const compareRes:boolean = bcryptjs.compareSync(loginData.password,findUser.password);
        if(!compareRes) throw new ApiException(CODES.AUTH.PASSWORD_INVALID,'密码错误');
        const payload = {username : findUser.username}
        // 生成token。
        response.cookie('token',this.JwtService.sign(payload),{httpOnly:false})
        return {
            username:findUser.username
        }
    }
}