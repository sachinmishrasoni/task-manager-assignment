import { Task } from '../types/task';

export type TasksState = {
    data: Task[];
    loading: boolean;
    error: string | null;
};

export type TState = {
    tasks: TasksState;
};

export const initialState: TState = {
    tasks: {
        data: [],
        loading: false,
        error: null
    }
};
