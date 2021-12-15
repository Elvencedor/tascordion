import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import ListItemModel from './listItem.model';

@ObjectType()
@Entity()
export default class ListModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  list_id: string;
  @Field()
  @Column()
  title: string;
  @Field((type) => [ListItemModel], { nullable: true })
  @OneToMany((type) => ListItemModel, (listItem) => listItem.item_id)
  listItems: ListItemModel[];
  @Field()
  @CreateDateColumn()
  created_at: Date;
  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
