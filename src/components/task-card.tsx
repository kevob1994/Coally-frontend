import { formatDate } from "@utils/date";
import { Pill } from "./pill";
import { TaskActions } from "./tast-actions";
import { ITask } from "@interfaces";

interface ITaskStatusButtonProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask) => void;
  changeStatusTask: (task: ITask, completed: boolean) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  changeStatusTask,
}: ITaskStatusButtonProps) {
  return (
    <div className='border-solid border-[1px] px-4 py-3 rounded-md mb-3'>
      <div className='flex justify-between items-center mb-2'>
        <p className='font-bold text-lg'>{task.title}</p>
        <p className='text-xs '>{formatDate(task?.createdAt)}</p>
      </div>

      <p className='text-sm mb-3'>{task.description}</p>
      <div className='flex justify-between items-center'>
        <Pill
          label={task.completed ? "completed" : "pending"}
          value={task.completed}
        />
        <div>
          <TaskActions
            task={task}
            changeStatusTask={changeStatusTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
}
