export interface Board {
  _id: string;
  title: string;
}

export interface Task {
  _id: string;
  description: string;
  order: number;
  board: Board;
}

export interface BoardData {
  board: Board;
  tasks: Task[];
}
