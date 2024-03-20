import { ApiProperty } from "@nestjs/swagger";

export enum LoginType {
    PassWord = 'password',
    MessageCode = 'messageCode',
  }

export class CreateAuthDto {
    @ApiProperty({ description: '账号',example: 'admin' })
    username:string;
    @ApiProperty({ description: '密码',example: 'admin' })
    password:string;
    @ApiProperty({ description: '登录方式',example:'password'})
    loginType?:LoginType;
}
