import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Button from '@mui/material/Button';
import '../css/TaskList.css'
import { Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
function TaskList() {


    const [todos, setTodos] = useState([]);
    const GET_URL = 'https://localhost:44380/api/Task/GetTask';
    const PUT_URL = 'https://localhost:44380/api/Task'
    

    const navigate = useNavigate();

    const getAllTasks = async() => {
        const response  = await axios.get(GET_URL);
        setTodos(response.data);

    }

    useEffect(() => {
        getAllTasks();
    }, []);
    
    const goToTaskAdd = () => {
        navigate('/taskadd');
    }

  const updateTask = async (id, todos) => {
    await axios.put(`${PUT_URL}/${id}`,todos);

  }
        
  return (
    <>
    <h1>Task List</h1>
    <Button variant="contained" color="success" onClick={goToTaskAdd}>
  Task Ekle 
</Button>
    <div className="todos-grid">
                {todos.map((todo) => (
                    <div key={todo.id} className="todo-card">
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <h5>{todo.createdDate}</h5>
                        <Button variant="outlined" startIcon={<EditIcon />}>
  Edit
</Button>


                        </div>
                ))}
            </div>
    </>
  )
}

export default TaskList