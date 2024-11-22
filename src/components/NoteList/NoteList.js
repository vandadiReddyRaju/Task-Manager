//import {useState} from "react"

//let tasks = [{id:1,Title:"Get Job",Description:"Learn in a way of cracking job",Category:"Work"}]
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./NoteList.css"

const NoteList = (props) => {
    //const[tasks,setTasks] = useState({id:1,Title:"Get Job",Description:"Learn in a way of cracking job",Category:"Work"})
    const {task,deleteTask,updateTask} = props

    const removeTask = () =>{
        deleteTask(task.id)
    }

    const changeTask =() =>{
        updateTask(task.id)
    }
    return(
        <div className="node-list">
                <h1>
                    {task.Title}
                </h1>
                <p>
                    {task.Description}
                </p>
                <p>{task.DueDate}</p>
                <h6>
                    {task.Status}
                </h6>
                <div className="buttons-container">
                    <button onClick={changeTask}><FaEdit /> edit</button>
                    <button onClick={removeTask}><MdDelete /> delete</button>
                </div>
                
        </div>
    )
}

export default NoteList