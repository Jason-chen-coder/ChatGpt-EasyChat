import {
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
export enum SignType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}
export class ApplyMessageCodeDto {
  @IsString({ message: 'phoneNumber 必须是字符串' })
  @IsPhoneNumber('CN', { message: 'phoneNumber 格式不正确' })
  @IsOptional()
  phoneNumber?: string;

  @IsString({ message: 'email 必须是字符串' })
  @IsEmail(null, { message: 'email 格式不正确' })
  @IsOptional()
  email?: string;

  @IsEnum(SignType, { message: 'signType 必须是 signIn 或 signUp' })
  signType: SignType;
}
