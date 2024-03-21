import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/public.decorator';
import { CResponse } from '@easy-chat/common';
import { ApplyMessageCodeDto } from './dto/apply-message-code.dto';
import { SingUpDTO } from './dto/sign-up.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/phoneMessageCode')
  async messageCode(@Body() phoneMessageCode: ApplyMessageCodeDto) {
    return CResponse.success(
      await this.authService.sendMessageCode(phoneMessageCode),
    );
  }

  @Public()
  @Post('/signup')
  async singUp(@Body() singUpData: SingUpDTO) {
    return CResponse.success(await this.authService.signUp(singUpData));
  }

  // @Public()
  // @Post('/login')
  // async login(
  //   @Body() loginData: CreateAuthDto,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   if (
  //     loginData.loginType == SignInType.MessageCode ||
  //     loginData.loginType == SignInType.PassWord
  //   ) {
  //     return CResponse.success(
  //       await this.authService.login(loginData, response),
  //     );
  //   } else {
  //     throw new ApiException(
  //       CODES.AUTH.UNKNOWN_LOGIN_TYPE,
  //       '不支持该登录方式！',
  //     );
  //   }
  // }
}
