import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  username: string;
  @ApiProperty({ description: '密码', example: 'admin' })
  password: string;
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
}
