import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { KanbanBoard } from 'src/schemas/kanban.board.schema';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsMongoId()
  readonly board: KanbanBoard;
}
