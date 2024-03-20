import { ApiProperty } from '@nestjs/swagger';
export class LoginResponse {
    @ApiProperty({example:200})
    code: number;

    @ApiProperty({example:'登录成功'})
    message:string;

    @ApiProperty({example:'asadq11as'})
    data:string;
}

export class SingUpResponse{
    @ApiProperty({example:200})
    code:number;

    @ApiProperty({example:'注册成功'})
    message:string;
}