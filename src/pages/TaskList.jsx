import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import '../css/TaskList.css';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function TaskList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const GET_URL = 'https://localhost:44380/api/Task/GetTask';
  const PUT_URL = 'https://localhost:44380/api/Task';

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axios.get(GET_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const goToTaskAdd = () => {
    navigate('/taskadd');
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`${PUT_URL}/${id}`, updatedTask);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTask } : todo
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleOpen = (todo) => {
    setSelectedId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>Task Listele</h1>
      <Button variant="contained" color="success" onClick={goToTaskAdd}>
        Task Ekle
      </Button>
      <div className="todos-grid">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <h5>{todo.createdDate}</h5>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => handleOpen(todo)}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const updatedTask = { title, description };
            updateTask(selectedId, updatedTask);
            
            handleClose();
          },
        }}
      >
        <DialogTitle>Task Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Edit Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskList;
