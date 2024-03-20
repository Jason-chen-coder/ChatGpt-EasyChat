import { ApiProperty } from '@nestjs/swagger';
import { SignType,SignUpType } from '../../../../easy-chat-common';

export class CreateAuthDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  username: string;
  @ApiProperty({ description: '密码', example: 'admin' })
  password: string;
  @ApiProperty({ description: '登录方式', example: 'password' })
  loginType?: SignType;
}

export class SingUpData {
  @ApiProperty({ description: '手机号', example: '15773263828' })
  phoneNumber: string;
  @ApiProperty({ description: '密码', example: 'Aa123456' })
  password: string;
  @ApiProperty({ description: '确认密码', example: 'Aa123456' })
  confirmPassword: string;
  @ApiProperty({ description: '验证码', example: '1234' })
  messageCode: string;
  @ApiProperty({ description: '注册方式', example: 'PhoneNumber' })
  loginType?: SignUpType;
}
