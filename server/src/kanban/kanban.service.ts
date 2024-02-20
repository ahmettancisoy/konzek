import { Injectable } from '@nestjs/common';
import { KanbanBoard } from 'src/schemas/kanban.board.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBoardDto } from './dto/create.board.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { KanbanTask } from 'src/schemas/kanban.task.schema';

@Injectable()
export class KanbanService {
  constructor(
    @InjectModel(KanbanBoard.name) private boardModel: Model<KanbanBoard>,
    @InjectModel(KanbanTask.name) private taskModel: Model<KanbanTask>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<KanbanBoard> {
    const createBoard = new this.boardModel(createBoardDto);
    return createBoard.save();
  }

  async findAllBoards(): Promise<KanbanBoard[]> {
    return this.boardModel.find().exec();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<KanbanTask> {
    const board = await this.boardModel.findById(createTaskDto.board);
    const tasks = await this.taskModel.find({ board });
    createTaskDto.order = tasks.length;
    const createTask = new this.taskModel(createTaskDto);

    return createTask.save();
  }

  async findAllTasks(): Promise<KanbanTask[]> {
    return this.taskModel.find().populate('board').exec();
  }

  async findBoardsWithTasks(): Promise<any[]> {
    const boards = await this.boardModel.find().exec();
    const result = [];

    for (const board of boards) {
      const tasks = await this.taskModel.find({ board: board._id }).exec();
      result.push({
        board: board.toObject(),
        tasks: tasks.map((task) => task.toObject()),
      });
    }

    return result;
  }

  async updateTasks(tasks: KanbanTask[]): Promise<KanbanTask[]> {
    const updatedTasks = await Promise.all(
      tasks.map(async (task, index) => {
        task.order = index;
        const { _id, ...updatedFields } = task;
        const updatedTask = await this.taskModel.findByIdAndUpdate(
          _id,
          { $set: updatedFields },
          { new: true, runValidators: true },
        );
        return updatedTask;
      }),
    );

    return updatedTasks;
  }
}
