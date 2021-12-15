import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListItemDTO {
  @Field()
  content: string;
  @Field()
  listListId: string;
}
