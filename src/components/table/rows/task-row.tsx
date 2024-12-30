import { Pill } from "@components/pill";
import { ITask } from "@interfaces";
import { formatDate } from "@utils/date";
import { TaskActions } from "@components/tast-actions";

interface ITaskRowProps {
  row: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask) => void;
  changeStatusTask: (task: ITask, completed: boolean) => void;
}

export function TaskRow({
  row,
  onEdit,
  onDelete,
  changeStatusTask,
}: ITaskRowProps): React.ReactNode {
  return (
    <>
      <td className='px-4 py-3'>{row.title}</td>
      <td className='px-4 py-3'>{row.description}</td>
      <td className='px-4 py-3'>
        <Pill
          label={row.completed ? "completed" : "pending"}
          value={row.completed}
        />
      </td>

      <td className='px-4 py-3'>{formatDate(row?.createdAt)}</td>
      <td className='px-4 py-3'>
        <TaskActions
          task={row}
          changeStatusTask={changeStatusTask}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </>
  );
}
