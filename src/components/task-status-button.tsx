import { BiTask, BiTaskX } from "react-icons/bi";
import { ToolTip } from "./tooltip";

interface ITaskStatusButtonProps {
  completed: boolean;
  onChangeStatus: (newStatus: boolean) => void;
}

export function TaskStatusButton({
  completed,
  onChangeStatus,
}: ITaskStatusButtonProps) {
  const icon = !completed ? <BiTask size={20} /> : <BiTaskX size={20} />;
  const colorClass = !completed ? "text-green-500" : "text-red-500";
  const tooltipContent = !completed ? "change to complete task" : "change to pending task";

  return (
    <ToolTip content={tooltipContent}>
      <button
        onClick={() => onChangeStatus(!completed)}
        className={`mr-2 ${colorClass} hover:underline`}
      >
        {icon}
      </button>
    </ToolTip>
  );
}
