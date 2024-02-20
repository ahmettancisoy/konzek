import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class KanbanBoard {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  order: number;
}

export const KanbanBoardSchema = SchemaFactory.createForClass(KanbanBoard);

//board order
//task order
//task parent
//add task
//delete task
//update task
//board name
