import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ListModule } from './modules/lists.module';
import { ListItemModule } from './modules/listItems.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('DATABASE'),
        entities: ['dist/**/*.model.js'],
        synchronize: true,
      }),
    }),
    ListModule,
    ListItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
