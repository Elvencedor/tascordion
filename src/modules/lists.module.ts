import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import * as redisStore from 'cache-manager-redis-store';
import { ListController } from '../controllers/lists.controller';
import ListModel from '../models/lists.model';
import { ListService } from '../services/lists.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
    TypeOrmModule.forFeature([ListModel]),
    ClientsModule.register([
      {
        name: 'LIST',
        transport: Transport.GRPC,
        options: {
          package: 'lists',
          protoPath: resolve(__dirname, '../protoFiles/list.proto'),
        },
      },
    ]),
  ],
  providers: [ListService],
  controllers: [ListController],
  exports: [],
})
export class ListModule {}
