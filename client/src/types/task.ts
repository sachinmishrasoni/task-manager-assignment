export interface Task {
    _id: string;
    title: string;
}

export type GetTasksResponse = {
  // message: string;
  data: Task[];
};

export type AddTaskResponse = {
  message: string;
  data: Task;
};
