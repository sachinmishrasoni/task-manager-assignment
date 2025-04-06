import TaskItem from './TaskItem';
import { useStore } from '../store/storeProvider';
import { Stack, Typography } from '@mui/material';

interface Props {
    onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ onDelete }) => {
    const { state } = useStore();
    const { data: tasks, loading, error } = state.tasks;

    if (loading) return <Typography variant='h6' align='center'>Loading tasks...</Typography>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (tasks.length === 0) return <Typography variant='h6' align='center'>No tasks found.</Typography>;

    return (
        <Stack spacing={1.5}>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={onDelete} />
            ))}
        </Stack>
    );
};

export default TaskList;
