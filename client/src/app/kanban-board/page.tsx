"use client";
import Card from "@/components/mid/kanban/Card";
import Task from "@/components/mid/kanban/Task";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Task as TaskType, BoardData } from "../constants/taskType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  setGroupedTasks,
  setIsDragging,
  setBoardData,
  setReload,
} from "@/lib/features/kanban/kanbanSlice";
import { MdAdd } from "react-icons/md";

export const Page: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.kanban.tasks);
  const isDragging = useSelector((state: RootState) => state.kanban.isDragging);
  const reload = useSelector((state: RootState) => state.kanban.reload);
  const boardData = useSelector((state: RootState) => state.kanban.boardData);
  const secondaryColor = useSelector(
    (state: RootState) => state.themeColor.secondaryColor
  );
  const [addBoardValue, setAddBoardValue] = useState("");

  const addBoardRef = useRef<HTMLInputElement>(null);

  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    setwinReady(true);
  }, []);

  async function fetchBoards() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/kanban/board-with-task`
      );
      const data: BoardData[] = await response.json();

      const sortedData = data.map(({ board, tasks }) => ({
        board,
        tasks: tasks.sort((a, b) => a.order - b.order),
      }));

      dispatch(setBoardData(sortedData));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    fetchBoards();
  }, [reload]);

  useEffect(() => {
    const updatedGroupedTasks: { [key: string]: TaskType[] } = {};
    tasks.forEach((task) => {
      const boardId = task.board._id;
      if (!updatedGroupedTasks[boardId]) {
        updatedGroupedTasks[boardId] = [];
      }
      updatedGroupedTasks[boardId].push(task);
    });
    dispatch(setGroupedTasks(updatedGroupedTasks));
  }, [tasks]);

  const handleDragStart = () => {
    dispatch(setIsDragging(true));
  };

  const handleDragDrop = async (result: DropResult) => {
    dispatch(setIsDragging(false));
    if (!result.destination) return;

    const sourceBoardId = result.source.droppableId;
    const destBoardId = result.destination.droppableId;
    const destinationIndex = result.destination.index;

    const updatedBoardData = boardData.map((boardEntry) => ({
      board: boardEntry.board,
      tasks: [...boardEntry.tasks],
    }));

    const sourceBoardIndex = updatedBoardData.findIndex(
      (boardEntry) => boardEntry.board._id === sourceBoardId
    );
    const destBoardIndex = updatedBoardData.findIndex(
      (boardEntry) => boardEntry.board._id === destBoardId
    );

    if (sourceBoardIndex === -1 || destBoardIndex === -1) return;

    const sourceTasks = updatedBoardData[sourceBoardIndex].tasks;
    const destTasks = updatedBoardData[destBoardIndex].tasks;

    const [movedTask] = sourceTasks.splice(result.source.index, 1);

    const existingTaskIndex = destTasks.findIndex(
      (task) => task._id === movedTask._id
    );
    if (existingTaskIndex !== -1) {
      destTasks.splice(existingTaskIndex, 1);
    }

    destTasks.splice(destinationIndex, 0, movedTask);
    const updatedTasks = destTasks.map((task) => ({
      ...task,
      board: destBoardId,
    }));

    try {
      dispatch(setBoardData(updatedBoardData));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/kanban/task`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTasks),
        }
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleBoardInput = (e: string) => {
    setAddBoardValue(e);
  };

  const handleAddBoard = async (title: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/kanban/board`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, order: 0 }),
        }
      );
      if (response) dispatch(setReload());
      setAddBoardValue("");
      addBoardRef.current?.focus();
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  return (
    <div className="px-12 py-6">
      <div className="pb-8 flex space-x-2 items-center">
        <input
          type="text"
          placeholder="board title"
          className="py-2.5 px-6 text-sm rounded-full w-72 shadow-sm placeholder:text-stone-400 focus:ring-0 border-0"
          ref={addBoardRef}
          value={addBoardValue}
          onChange={(e) => handleBoardInput(e.target.value)}
        />
        <div
          onClick={() => handleAddBoard(addBoardValue)}
          className={`rounded-full ${secondaryColor.background} w-8 h-8 items-center flex justify-center text-white text-xl transition-all cursor-pointer`}
        >
          <MdAdd />
        </div>
      </div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragDrop}>
        <div className="flex flex-wrap gap-6 w-fit h-full select-none">
          {winReady
            ? boardData.map(({ board, tasks }) => (
                <Card key={board._id} title={board.title} id={board._id}>
                  {tasks.map((task, index) => (
                    <Task
                      id={task._id}
                      index={index}
                      key={task._id}
                      description={task.description}
                      isDragDisabled={isDragging}
                    />
                  ))}
                </Card>
              ))
            : null}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Page;
