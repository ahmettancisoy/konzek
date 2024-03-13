import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanBoard } from 'src/schemas/kanban.board.schema';
import { KanbanTask } from 'src/schemas/kanban.task.schema';

@Controller('kanban')
export class KanbanController {
  constructor(private kanbanService: KanbanService) {}

  @Get('board')
  async findAllBoards(): Promise<KanbanBoard[]> {
    return this.kanbanService.findAllBoards();
  }

  @Post('board')
  async createBoard(@Body() board: KanbanBoard): Promise<KanbanBoard> {
    const res = await this.kanbanService.createBoard(board);
    return res;
  }

  @Get('task')
  async findAllTasks(): Promise<KanbanTask[]> {
    return this.kanbanService.findAllTasks();
  }

  @Post('task')
  async createTask(@Body() task: KanbanTask): Promise<KanbanTask> {
    const res = await this.kanbanService.createTask(task);
    return res;
  }

  @Get('board-with-task')
  async findBoardsWithTasks(): Promise<any> {
    const res = await this.kanbanService.findBoardsWithTasks();
    return res;
  }

  @Put('task')
  async updateTasks(@Body() tasks: KanbanTask[]): Promise<KanbanTask[]> {
    return await this.kanbanService.updateTasks(tasks);
  }
}
