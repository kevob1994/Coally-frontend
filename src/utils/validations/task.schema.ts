import * as Yup from "yup";

export const taskSchema = Yup.object({
  title: Yup.string().required("The title is required"),
  description: Yup.string(),
  completed: Yup.boolean(),
});
