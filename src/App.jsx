import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTask, deleteTask, editTask, selectTasks } from './taskslice.jsx';
import { Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function App() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch(addTask(newTask));
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() !== '') {
      dispatch(editTask({ index: editIndex, value: editValue }));
      setEditIndex(null);
      setEditValue('');
      setOpenEditDialog(false);
    }
  };

  return (
    <Box sx={{ my: 10, textAlign: 'center' }}>
      <Box >
      <TextField
        label="Add Task"
        variant="outlined"
        color = "primary"
        size="small"
        value={newTask}
        focused
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button variant="contained" color="primary" sx={{ marginLeft: '10px' }} onClick={handleAddTask}
      >
        Add Task
      </Button>
      </Box>

      <List sx={{maxWidth : fullScreen ? '70%' : '40%', margin : 'auto', backgroundColor : 'whitesmoke', my : 3}}>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={<span>{task}</span>} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(index)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullScreen={fullScreen} >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit Task"
            variant="outlined"
            value={editValue}
            size="small"
            sx={{my : 2}}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
