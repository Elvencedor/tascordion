import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ListModel from 'src/models/lists.model';
import { ListItemController } from '../controllers/listItem.controller';
import ListItemModel from '../models/listItem.model';
import { ListItemService } from '../services/listItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListItemModel, ListModel])],
  providers: [ListItemService],
  controllers: [ListItemController],
  exports: [],
})
export class ListItemModule {}
