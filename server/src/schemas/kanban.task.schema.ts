import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { KanbanBoard } from './kanban.board.schema';

@Schema({ versionKey: false })
export class KanbanTask {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  order: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KanbanBoard',
  })
  board: KanbanBoard;
}

export const KanbanTaskSchema = SchemaFactory.createForClass(KanbanTask);
