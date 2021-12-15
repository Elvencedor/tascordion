import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ListsDTO } from '../dto/lists.dto';
import { ListService } from '../services/lists.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @MessagePattern({ role: 'list', cmd: 'create-list' })
  createList(payload: ListsDTO) {
    return this.listService.create(payload);
  }

  @MessagePattern({ role: 'list', cmd: 'update-list' })
  updateListById({ payload, listId }: { payload: ListsDTO; listId: string }) {
    return this.listService.updateById(payload, listId);
  }

  @MessagePattern({ role: 'list', cmd: 'delete-list' })
  deleteListById(listId: string) {
    return this.listService.deleteById(listId);
  }
}
