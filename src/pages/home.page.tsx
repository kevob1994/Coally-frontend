import {
  Button,
  Modal,
  ModalAlert,
  TaskForm,
  TaskRow,
  Table,
  Select,
  TaskCard,
} from "@components";
import { useModal } from "@hooks";
import { ITask } from "@interfaces";
import {
  deleteTask,
  fetchTasks,
  setFilterByStatus,
  updateTask,
} from "@redux/slices/task.slice";
import { RootState, useAppDispatch } from "@redux/store";
import { COLUMNS_POST, STATUS_TASKS } from "@utils/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useSelector((state: RootState) => state.task);
  const filterByStatus = useSelector(
    (state: RootState) => state.task.filterByStatus
  );
  const formModal = useModal();
  const deleteModal = useModal();

  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const columns = useMemo(
    () => [...COLUMNS_POST, { Header: "Actions", accessor: "actions" }],
    []
  );

  useEffect(() => {
    dispatch(
      fetchTasks(
        filterByStatus !== "all"
          ? {
              completed: filterByStatus,
            }
          : {}
      )
    );
  }, [dispatch, filterByStatus]);

  const handleDelete = useCallback(
    (task: ITask) => {
      setCurrentTask(task);
      deleteModal.openModal();
    },
    [deleteModal]
  );

  const handleEdit = useCallback(
    (task: ITask) => {
      formModal.openModal();
      setCurrentTask(task);
    },
    [formModal]
  );

  const handleCreate = useCallback(() => {
    setCurrentTask(null);
    formModal.openModal();
  }, [formModal]);

  const changeStatusTask = useCallback(
    async (task: ITask, completed: boolean) => {
      try {
        await dispatch(updateTask({ ...task, completed })).unwrap();
        toast.success("The task was edited successfully");
      } catch (error) {
        console.error(error);
        toast.error("An error occurred editing the status of the task");
      }
    },
    [dispatch]
  );

  const renderCustomRow = useCallback(
    (row: ITask) => (
      <TaskRow
        key={row._id}
        row={row}
        onDelete={() => handleDelete(row)}
        onEdit={() => handleEdit(row)}
        changeStatusTask={changeStatusTask}
      />
    ),
    [handleDelete, handleEdit, changeStatusTask]
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (currentTask) await dispatch(deleteTask(currentTask._id)).unwrap();
      toast.success("Task was successfully deleted");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the task");
    } finally {
      deleteModal.closeModal();
    }
  }, [currentTask, deleteModal, dispatch]);

  const handleChange = useCallback(
    (value: string) => {
      dispatch(setFilterByStatus(value));
    },
    [dispatch]
  );

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Task list</h1>
      <div className='md:flex justify-between items-end mb-5'>
        <Select
          id='status'
          label='Filter by status'
          options={STATUS_TASKS}
          selectedValue={filterByStatus}
          onChange={handleChange}
        />
        <div className='mt-5 md:mt-0'>
          <Button onClick={handleCreate}>Create task</Button>
        </div>
      </div>
      <div className='hidden md:block'>
        <Table
          data={tasks}
          columns={columns}
          renderRow={renderCustomRow}
          isLoading={loading}
        />
      </div>
      <div className='block md:hidden'>
        {tasks.map((task) => (
          <TaskCard
            task={task}
            onDelete={() => handleDelete(task)}
            onEdit={() => handleEdit(task)}
            changeStatusTask={changeStatusTask}
          />
        ))}
      </div>
      {tasks.length == 0 && !loading && (
        <p className='text-center font-bold text-4xl text-gray-800 mt-5'>
          No tasks found
        </p>
      )}
      <Modal
        isOpen={formModal.isOpen}
        onClose={() => {
          formModal.closeModal();
        }}
        title={currentTask ? "Edit task" : "Create task"}
      >
        <TaskForm
          task={currentTask}
          onClose={() => {
            formModal.closeModal();
          }}
          loading={loading}
        />
      </Modal>
      <ModalAlert
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        title='Delete task'
        description='Are you sure you want to delete the task?'
        onOk={handleConfirmDelete}
      />
    </div>
  );
}
