import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ListItemDTO } from '../dto/listItem.dto';
import { ListItemService } from '../services/listItem.service';

@Controller('listItems')
export class ListItemController {
  constructor(private readonly listItemService: ListItemService) {}

  @MessagePattern({ role: 'item', cmd: 'create-item' })
  createListItem(payload: ListItemDTO) {
    return this.listItemService.create(payload);
  }

  @MessagePattern({ role: 'item', cmd: 'update-item' })
  updateListItemById({
    payload,
    itemId,
  }: {
    payload: ListItemDTO;
    itemId: string;
  }) {
    return this.listItemService.updateById(payload, itemId);
  }

  @MessagePattern({ role: 'item', cmd: 'delete-item' })
  deleteListItemById(itemId: string) {
    return this.listItemService.deleteById(itemId);
  }
}
