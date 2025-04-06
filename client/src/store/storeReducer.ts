import { Task } from '../types/task';
import { TState } from './initialState';

export type Action =
    | { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

export const storeReducer = (
    state: TState,
    action: Action
) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    data: [...state.tasks.data, action.payload]
                }
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    data: state.tasks.data.filter((task) => task._id !== action.payload)
                }
            };
        case 'SET_LOADING':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    loading: action.payload
                }
            };
        case 'SET_ERROR':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    error: action.payload
                }
            };
        default:
            return state;
    }
};
