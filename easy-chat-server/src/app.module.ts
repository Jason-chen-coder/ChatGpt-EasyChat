import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AllExceptionFilter } from './common/all-exception.filter';
@Module({
  imports: [AuthModule,TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'easychat',// 注意设置为全小写
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true, //自动加载实体
    }
  )],
  controllers: [AppController],
  providers: [
    AppService,
    {provide:APP_GUARD,useClass:JwtAuthGuard,},
    {provide:APP_FILTER,useClass:AllExceptionFilter}
  ],
})
export class AppModule {}
