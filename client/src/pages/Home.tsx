import { Alert, Container, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTasks, addTask, deleteTask } from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useStore } from '../store/storeProvider';

const Home = () => {
    const { dispatch } = useStore();
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const showToast = (message: string, severity: 'success' | 'error' = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const fetchTasks = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await getTasks();
            dispatch({ type: 'SET_TASKS', payload: response });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load tasks' });
            showToast('Failed to load tasks', 'error');
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAdd = async (title: string) => {
        try {
            const newTask = await addTask(title);
            console.log(newTask);
            dispatch({ type: 'ADD_TASK', payload: newTask });
            showToast('Task added successfully');
        } catch {
            showToast('Failed to add task', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            dispatch({ type: 'DELETE_TASK', payload: id });
            showToast('Task deleted successfully');
        } catch {
            showToast('Failed to delete task', 'error');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>Task Manager</Typography>
            <TaskForm onAdd={handleAdd} />
            <TaskList onDelete={handleDelete} />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Home;
