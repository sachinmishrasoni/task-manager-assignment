import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getTasks, addTask, deleteTask } from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useStore } from '../store/storeProvider';

const Home = () => {
    const { dispatch } = useStore();

    const fetchTasks = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await getTasks();
            dispatch({ type: 'SET_TASKS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load tasks' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAdd = async (title: string) => {
        await addTask(title);
        fetchTasks();
    };

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>Task Manager</Typography>
            <TaskForm onAdd={handleAdd} />
            <TaskList onDelete={handleDelete} />
        </Container>
    );
};

export default Home;
