import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { Task, Board } from "@/app/constants/taskType";

interface KanbanState {
  tasks: Task[];
  groupedTasks: { [key: string]: Task[] };
  isDragging: boolean;
  boardData: { board: Board; tasks: Task[] }[];
  reload: boolean;
}

const initialState: KanbanState = {
  tasks: [],
  groupedTasks: {},
  isDragging: false,
  boardData: [],
  reload: false,
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setGroupedTasks(state, action: PayloadAction<{ [key: string]: Task[] }>) {
      state.groupedTasks = action.payload;
    },
    setIsDragging(state, action: PayloadAction<boolean>) {
      state.isDragging = action.payload;
    },
    setBoardData(
      state,
      action: PayloadAction<{ board: Board; tasks: Task[] }[]>
    ) {
      state.boardData = action.payload;
    },
    setReload(state, action: PayloadAction<void>) {
      state.reload = !state.reload;
    },
  },
});

export const {
  setTasks,
  setGroupedTasks,
  setIsDragging,
  setBoardData,
  setReload,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
