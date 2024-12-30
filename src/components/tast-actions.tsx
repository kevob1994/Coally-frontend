import { ToolTip } from "./tooltip";
import { TaskStatusButton } from "./task-status-button";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { ITask } from "@interfaces";

interface ITaskActionsProps {
  task: ITask;
  changeStatusTask: (task: ITask, status: boolean) => void;
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask) => void;
}

export function TaskActions({
  task,
  changeStatusTask,
  onEdit,
  onDelete,
}: ITaskActionsProps) {
  return (
    <div className='flex items-center space-x-2'>
      <TaskStatusButton
        onChangeStatus={(status) => changeStatusTask(task, status)}
        completed={task.completed}
      />
      <ToolTip content='Edit'>
        <button
          onClick={() => onEdit(task)}
          className='mr-2 text-blue-600 hover:underline'
        >
          <MdOutlineEdit size={20} />
        </button>
      </ToolTip>
      <ToolTip content='Delete'>
        <button
          onClick={() => onDelete(task)}
          className='text-red-600 hover:underline'
        >
          <MdDeleteOutline size={20} />
        </button>
      </ToolTip>
    </div>
  );
}
