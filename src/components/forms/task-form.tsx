import { Button, Input, Textarea } from "@components";

import { ITask } from "@interfaces";
import { createTask, updateTask } from "@redux/slices/task.slice";
import { useAppDispatch } from "@redux/store";
import { taskSchema } from "@utils/validations/task.schema";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ITaskFormProps {
  task: ITask | null;
  onClose: () => void;
  loading: boolean;
}

export function TaskForm({ task, onClose, loading }: ITaskFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      completed: task ? task.completed : false,
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      try {
        if (task) {
          await dispatch(updateTask({ ...values, _id: task._id })).unwrap();
        } else {
          await dispatch(createTask({ ...values })).unwrap();
        }
        toast.success(
          `The task was ${task ? "edited" : "created"} successfully `
        );
        onClose();
      } catch (error) {
        console.error(error);
        toast.error(`An error occurred  ${task ? "editing" : "creating"} task`);
      }
    },
  });

  useEffect(() => {
    if (task) {
      formik.setValues({
        title: task.title,
        description: task.description,
        completed: task.completed,
      });
    } else {
      formik.setValues({
        title: "",
        description: "",
        completed: false,
      });
    }
  }, [task]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-4'>
        <Input
          label='Title'
          type='text'
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Enter the title of the task'
          error={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ""
          }
        />
      </div>
      <div className='mb-4'>
        <Textarea
          label='description'
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Enter the task description'
          error={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ""
          }
        />
      </div>
      
      <Button
        type='submit'
        disabled={loading || !formik.values.title }
      >
        {loading
          ? task
            ? "Updating Task..."
            : "Creating Task..."
          : task
          ? "Update Task"
          : "Create Task"}
      </Button>
    </form>
  );
}
