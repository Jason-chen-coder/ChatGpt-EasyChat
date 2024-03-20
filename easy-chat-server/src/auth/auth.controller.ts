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
import { CreateAuthDto, SingUpData } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from 'src/common/public.decorator';
import { CResponse } from '../../../easy-chat-common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { LoginResponse, SingUpResponse } from './vo/login-user.vo';
import { Response } from 'express';
import { ApiException, CODES } from 'src/common/exception';
import { SignType } from '../../../easy-chat-common';
@ApiTags('登录注册')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 通用接口(注册和登录接口)都加上@Public装饰器
  @Public()
  @Post('/signup')
  @ApiOperation({ summary: '用户注册' })
  @ApiOkResponse({ description: '注册成功返回', type: SingUpResponse })
  async singUp(@Body() singUpData: SingUpData) {
    return CResponse.success(await this.authService.signUp(singUpData));
  }

  @Public()
  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  @ApiOkResponse({ description: '登录成功返回', type: LoginResponse })
  async login(
    @Body() loginData: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (
      loginData.loginType == SignType.MessageCode ||
      loginData.loginType == SignType.PassWord
    ) {
      return CResponse.success(
        await this.authService.login(loginData, response),
      );
    } else {
      throw new ApiException(
        CODES.AUTH.UNKNOWN_LOGIN_TYPE,
        '不支持该登录方式！',
      );
    }
  }
}
