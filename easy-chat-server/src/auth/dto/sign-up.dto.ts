import { BadRequestException } from '@nestjs/common';
import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  Matches,
  ValidateIf,
} from 'class-validator';

export enum SignUpType {
  Email = 'email',
  PhoneNumber = 'phoneNumber',
}

export class SingUpDTO {
  // 自定义校验方法
  validateEmailAndPhoneNumber = (o: SingUpDTO): boolean => {
    if (!o.phoneNumber && !o.email) {
      if (o.signUpType == SignUpType.Email)
        throw new BadRequestException('请提供电子邮件地址');
      if (o.signUpType == SignUpType.PhoneNumber)
        throw new BadRequestException('请提供手机号号');
      return false;
    }
    return true;
  };
  @IsString({ message: '密码 必须是字符串' })
  password: string;

  @IsString({ message: '用户名 必须是字符串' })
  userName: string;

  @Matches(/^[1-9][0-9]{5}$/, {
    message: '验证码必须是6位纯数字',
  })
  messageCode: string;

  @IsEnum(SignUpType, { message: 'signUpType 必须是 email 或 phoneNumber' })
  signUpType: SignUpType;

  @IsString({ message: 'phoneNumber 必须是字符串' })
  @IsPhoneNumber('CN', { message: 'phoneNumber 格式不正确' })
  @IsOptional()
  @ValidateIf((o: SingUpDTO) => o.validateEmailAndPhoneNumber(o))
  phoneNumber?: string;

  @IsString({ message: 'email 必须是字符串' })
  @IsEmail(null, { message: 'email 格式不正确' })
  @IsOptional()
  @ValidateIf((o: SingUpDTO) => o.validateEmailAndPhoneNumber(o))
  email?: string;
}
