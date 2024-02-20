import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  KanbanBoard,
  KanbanBoardSchema,
} from 'src/schemas/kanban.board.schema';
import { KanbanTask, KanbanTaskSchema } from 'src/schemas/kanban.task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KanbanBoard.name, schema: KanbanBoardSchema },
      { name: KanbanTask.name, schema: KanbanTaskSchema },
    ]),
  ],
  providers: [KanbanService],
  controllers: [KanbanController],
})
export class KanbanModule {}
