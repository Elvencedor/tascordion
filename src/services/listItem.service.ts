import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListItemDTO } from '../dto/listItem.dto';
import ListItemModel from '../models/listItem.model';
import { Repository } from 'typeorm';
import ListModel from 'src/models/lists.model';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItemModel)
    private listItemRepository: Repository<ListItemModel>,
    @InjectRepository(ListModel)
    private listRepository: Repository<ListModel>,
  ) {}

  async create(payload: ListItemDTO): Promise<ListItemModel> {
    const { listListId } = payload;
    const list = this.listRepository.findOne(listListId);
    if (list) {
      const listItem = this.listItemRepository.save(payload);
      return listItem;
    }
    return {} as any;
  }

  async updateById(
    payload: ListItemDTO,
    listItemId: string,
  ): Promise<ListItemModel> {
    this.listItemRepository.update({ item_id: listItemId }, payload);
    return this.listItemRepository.findOne({ item_id: listItemId });
  }

  async deleteById(listItemId: string): Promise<boolean> {
    this.listItemRepository.delete(listItemId);
    return true;
  }

  async getById(listItemId: string): Promise<ListItemModel> {
    return this.listItemRepository.findOne(listItemId);
  }
}
