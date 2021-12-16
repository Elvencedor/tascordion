import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ListModel from '../models/lists.model';
import { Repository } from 'typeorm';
import { ListsDTO } from 'src/dto/lists.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListModel)
    private listRepository: Repository<ListModel>,
  ) {}

  async create(payload: ListsDTO): Promise<ListModel> {
    const list = this.listRepository.save(payload);
    return list;
  }

  async updateById(payload: ListsDTO, listId: string): Promise<ListModel> {
    this.listRepository.update({ list_id: listId }, payload);
    return this.listRepository.findOne({ list_id: listId });
  }

  async deleteById(listId: string): Promise<boolean> {
    this.listRepository.delete(listId);
    return true;
  }

  async getById(listId: string): Promise<ListModel> {
    return this.listRepository.findOne(listId);
  }
}
