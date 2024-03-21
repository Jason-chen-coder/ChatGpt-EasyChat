import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import JwtAuthStrategy from './jwt-auth.strategy';
import { RedisService } from 'src/tools/redis';
@Module({
  imports: [
    //TypeOrmModule.forFeature()方法注册USER表，这样我们可以使用@InjectRepository()装饰器将UserRepository注入到auth.service.ts中
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, RedisService],
})
export class AuthModule {}
