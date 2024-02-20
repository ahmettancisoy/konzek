import { ReactNode, useState, useRef, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { IoMdSend } from "react-icons/io";
import { setReload } from "@/lib/features/kanban/kanbanSlice";

interface Props {
  children: ReactNode;
  title: string;
  id: string;
}

const Card: React.FC<Props> = ({ children, title, id }) => {
  const dispatch = useDispatch();
  const reload = useSelector((state: RootState) => state.kanban.reload);
  const primaryColor = useSelector(
    (state: RootState) => state.themeColor.primaryColor
  );
  const [isAddTaskActive, setIsAddTaskActive] = useState(false);
  const [addTaskValue, setAddTaskValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [isAddTaskActive]);

  const handleNewTask = async (id: string, description: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/kanban/task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            board: id,
            order: 999,
            description: description,
          }),
        }
      );
      setAddTaskValue("");
      dispatch(setReload());
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg py-4 pl-4 pr-1 w-64 h-96">
      <div className="pb-2 font-light text-xl text-center">{title}</div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="h-5/6 overflow-auto scrollbar pr-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className={`flex items-center space-x-2 ${primaryColor.text}`}>
        {!isAddTaskActive ? (
          <>
            <IoAddCircleOutline />
            <span
              className="text-sm cursor-pointer"
              onClick={() => setIsAddTaskActive(true)}
            >
              Add task
            </span>
          </>
        ) : (
          <div className="flex items-center gap-2 w-full h-full">
            <input
              type="text"
              ref={ref}
              placeholder="description"
              className="text-xs rounded-full bg-slate-200 focus:outline-none py-2 px-4"
              value={addTaskValue}
              onChange={(e) => setAddTaskValue(e.target.value)}
            />

            <div
              className="text-lg w-full flex items-center cursor-pointer"
              onClick={() => handleNewTask(id, addTaskValue)}
            >
              <IoMdSend />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
