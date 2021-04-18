import { TimestampEntity } from './../../generics/timestamp-entity';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../enums/TodoStatusEnum";


@Entity('todo')
export class todoEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: 'varchar'})
name: string;
@Column({type: 'varchar'})
description: string;
@Column({type: 'varchar'})
date: Date;
@Column({})
status: TodoStatusEnum;

}