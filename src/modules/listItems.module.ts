import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { resolve } from 'path';
import ListModel from 'src/models/lists.model';
import { ListItemController } from '../controllers/listItem.controller';
import ListItemModel from '../models/listItem.model';
import { ListItemService } from '../services/listItem.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListItemModel, ListModel]),
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
  providers: [ListItemService],
  controllers: [ListItemController],
  exports: [],
})
export class ListItemModule {}
