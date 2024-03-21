// redis.service.ts
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;
  logger = new Logger(RedisService.name);
  constructor() {
    this.init();
  }
  private init() {
    this.redis = new Redis({
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0, // Defaults to 0
    });
    this.redis.on('connect', () => {
      this.logger.log('Redis 已连接');
    });
    this.redis.on('error', (err) => {
      this.logger.error('Redis 连接失败', err);
    });
    this.redis.on('ready', () => {
      this.logger.log('Redis 已就绪');
    });
    this.redis.on('reconnecting', () => {
      this.logger.log('Redis 正在重连');
    });
    this.redis.on('end', () => {
      this.logger.log('Redis 已断开连接');
    });
    this.redis.on('close', () => {
      this.logger.log('Redis 已关闭连接');
    });
    this.redis.on('warning', (warning) => {
      this.logger.warn('Redis 警告', warning);
    });
  }

  async set(key: string, value: string, type: any, expire = 60 * 5) {
    return await this.redis.set(key, value, type, expire);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async del(key: string) {
    return await this.redis.del(key);
  }

  async isExist(key: string) {
    return await this.redis.exists(key);
  }
}
