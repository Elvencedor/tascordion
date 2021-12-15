import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from '../controllers/lists.controller';
import ListModel from '../models/lists.model';
import { ListService } from '../services/lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListModel])],
  providers: [ListService],
  controllers: [ListController],
  exports: [],
})
export class ListModule {}
