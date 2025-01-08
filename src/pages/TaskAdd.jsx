import React, { useEffect } from 'react'
import { useState } from 'react' 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css/TaskAdd.css'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


function TaskAdd() {
{
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);  
  const navigate = useNavigate();
  

  const POST_URL = 'https://localhost:44380/api/Task/Create-Task';

  const addTask = async() => {  
    try {
      const response = await axios.post(POST_URL, {title: title, description: description});
    } catch (error) {
      console.error(error);
    }
    setOpen(true);
  }
  

  const homePage = () => {
    navigate('/');
  }

  
  return (
    <> <h1>Task Ekle</h1>
    <div className="taskAdd-height">
    <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} className='taskAdd-input'/>
    <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)}  className='taskAdd-input'/>
    <Button variant="contained" color="success" onClick={addTask}className='taskAdd-button'>Task Ekle</Button>
    <Button variant="contained" color="info" onClick={homePage}className='taskAdd-button'>Geri</Button>
    <Snackbar open={open} autoHideDuration={6000} onClose={() => navigate('/')} >
        <Alert onClose={() => navigate('/')} severity="success" sx={{ width: '100%' }}>
          Task Eklendi
        </Alert>
    </Snackbar>
    </div>
    </>
  )
}
}
export default TaskAdd