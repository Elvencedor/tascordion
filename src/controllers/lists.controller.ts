import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListsDTO } from '../dto/lists.dto';
import { ListService } from '../services/lists.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @GrpcMethod('ListProtoService', 'createList')
  createList(payload: ListsDTO) {
    return this.listService.create(payload);
  }

  @GrpcMethod('ListProtoService', 'updateListById')
  updateListById({ payload, listId }: { payload: ListsDTO; listId: string }) {
    return this.listService.updateById(payload, listId);
  }

  @GrpcMethod('ListProtoService', 'deleteListById')
  deleteListById(listId: string) {
    return this.listService.deleteById(listId);
  }
}
