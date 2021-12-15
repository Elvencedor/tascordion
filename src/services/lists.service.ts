import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListsDTO } from '../dto/lists.dto';
import ListModel from '../models/lists.model';
import { Repository } from 'typeorm';

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
