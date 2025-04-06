import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface Props {
    onAdd: (title: string) => void;
}

const TaskForm: React.FC<Props> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                label="New Task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <Button variant="contained" type="submit">Add</Button>
        </Box>
    );
};

export default TaskForm;
