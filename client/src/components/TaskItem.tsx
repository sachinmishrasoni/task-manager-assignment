import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../types/task';

interface Props {
    task: Task;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete }) => (
    <Card sx={{
        borderRadius: 25,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    }}>
        <CardContent sx={{ px: 2, py: '10px !important', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h6' lineHeight={1}>{task.title}</Typography>
            <IconButton onClick={() => onDelete(task._id)} color="error" size='small'>
                <DeleteIcon fontSize='small' />
            </IconButton>
        </CardContent>
    </Card>
);

export default TaskItem;
