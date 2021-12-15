import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import ListModel from './lists.model';

@ObjectType()
@Entity()
export default class ListItemModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  item_id: string;
  @Field()
  @Column()
  content: string;
  @Field()
  @ManyToOne((type) => ListModel, { nullable: true })
  list: ListModel;
  @Field()
  @CreateDateColumn()
  created_at: Date;
  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
