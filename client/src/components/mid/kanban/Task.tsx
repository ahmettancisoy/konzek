import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  description: string;
  id: string;
  index: number;
  isDragDisabled: boolean;
}

const Task: React.FC<Props> = ({ description, id, index, isDragDisabled }) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-slate-200 rounded-md p-2 mt-2 select-none"
        >
          {description}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
