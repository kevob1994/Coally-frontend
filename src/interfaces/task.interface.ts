export interface ITask {
  _id: number;
  title: string;
  description?: string;
	completed: boolean;
	createdAt?: Date;
}

export type TCreateTaskType = Omit<Omit<ITask, '_id'>, 'createdAt'>;