import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ApiException, CODES } from 'src/common/exception';

import { ApplyMessageCodeDto, SignType } from './dto/apply-message-code.dto';
import { SingUpDTO } from './dto/sign-up.dto';
import { RedisService } from '../tools/redis';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly JwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}
  logger = new Logger(AuthService.name);
  BCRYPT_GENSALT_SALT = this.configService.get('BCRYPT_GENSALT_SALT');
  // 发送验证码
  async sendMessageCode(phoneMessageCodeData: ApplyMessageCodeDto) {
    const { phoneNumber, email, signType } = phoneMessageCodeData;
    const code = Math.random().toString().slice(-6);
    if (phoneNumber || email) {
      // 检索user数据库是否有用户
      const user = await this.findUser(phoneNumber, email);
      // 如有，直接返回已有用户
      if (user && signType == SignType.SignUp) {
        throw new ApiException(CODES.AUTH.USER_EXIST, '该用户已存在！');
      } else {
        // 如无，返回code并设置redis缓存
        const redsKey = await this.generateMessageCodeRedisKey(
          phoneNumber || email,
          signType,
        );
        // 设置有效期
        this.redisService.set(redsKey, code, 'EX', 3600);
        return code;
      }
    } else {
      throw new ApiException(CODES.PARAM_ERROR, '缺失手机号或邮箱号');
    }
  }

  // 注册账号
  async signUp(singUpData: SingUpDTO) {
    const { phoneNumber, email, messageCode } = singUpData;
    const user = await this.findUser(phoneNumber, email);
    if (user) {
      throw new ApiException(CODES.AUTH.USER_EXIST, '该用户已存在！');
    }
    // redis获取验证码
    const redsKey = await this.generateMessageCodeRedisKey(
      phoneNumber || email,
      SignType.SignUp,
    );
    const redisMessageCode = await this.redisService.get(redsKey);
    if (!redisMessageCode) {
      throw new ApiException(CODES.AUTH.MESSAGE_CODE_NOT_EXIST, '验证码不存在');
    }
    if (redisMessageCode !== messageCode) {
      throw new ApiException(CODES.AUTH.MESSAGE_CODE_INVALID, '验证码有误');
    }
    try {
      singUpData.password = await bcryptjs.hashSync(
        singUpData.password,
        JSON.parse(this.BCRYPT_GENSALT_SALT),
      );
      this.user.save(singUpData);
    } catch (e) {
      this.logger.error(e);
      throw new ApiException(500, '加密密码失败');
    }
    return '注册成功！';
  }

  async generateMessageCodeRedisKey(val: string, signType: SignType) {
    return `${val}_${signType}`;
  }
  async findUser(phoneNumber: string = '', email: string = '') {
    let user = null;
    if (phoneNumber) {
      user = await this.user.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });
    }
    if (email) {
      user = await this.user.find({
        where: {
          email: email,
        },
      });
    }
    return user;
  }
  //   async login(loginData: CreateAuthDto, response: Response) {
  //     const findUser = await this.user.findOne({
  //       where: {
  //         userName: loginData.userName,
  //       },
  //     });
  //     if (!findUser) {
  //       throw new ApiException(CODES.AUTH.USER_NOT_EXIST, '该用户不存在！');
  //     }
  //     // 对用户的密码和加密后的密码进行比较的，如果正确返回true，错误则返回fasle,第一个参数为登录时用户输入的密码，第二个为查出来的加密后的密码。加密密码的方法是不可逆的，也就是没有解密的功能，这样做也是保证用户的安全。
  //     const compareRes: boolean = bcryptjs.compareSync(
  //       loginData.password,
  //       findUser.password,
  //     );
  //     if (!compareRes)
  //       throw new ApiException(CODES.AUTH.PASSWORD_INVALID, '密码错误');
  //     const payload = { userName: findUser.userName };
  //     // 生成token。
  //     response.cookie('token', this.JwtService.sign(payload), {
  //       httpOnly: false,
  //     });
  //     return {
  //       userName: findUser.userName,
  //     };
  //   }
}
