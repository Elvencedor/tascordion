import { Field, InputType } from '@nestjs/graphql';
import ListItemModel from '../models/listItem.model';
import { ListItemDTO } from './listItem.dto';

@InputType()
export class ListsDTO {
  @Field()
  title: string;
  @Field((type) => [ListItemDTO])
  listItems: ListItemModel[];
}
