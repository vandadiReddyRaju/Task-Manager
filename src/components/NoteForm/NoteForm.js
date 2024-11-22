import {useState} from "react"

import {v4 as uuidv4} from "uuid"

import NoteList from "../NoteList/NoteList"

import "./NoteForm.css"

const NoteForm = () =>{

    const data = localStorage.getItem("Tasks");
    

    const savedTasks = data ? JSON.parse(data) : [];
    
    
    
    const[tasks,setTasks] = useState(savedTasks)
    const[title,setTitle] = useState("")
    const today = new Date().toISOString().split("T")[0];
    const [dueDate, setDueDate] = useState(today);
    const[description,setDescription] = useState("")
    const[status,setStatus] = useState("Pending")
    
    const[updateId,setUpdateId] = useState("")

    const updateTask = (id) =>{
        const taskDetails = tasks.find(each =>each.id === id)
    setUpdateId(id)
    setTitle(taskDetails.Title)
    setDescription(taskDetails.Description)
    setStatus(taskDetails.Status)
    }

    const deleteTask = (id) =>{
        
        const updatedTasks = tasks.filter((each) => each.id !== id); 
    
        setTasks(updatedTasks)
        localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
    }

    const addTask = async (event) =>{
        
        event.preventDefault()
        if(title === "" || description === "" || dueDate === ""){
            alert("Enter all the fields");
            return
        }
        

        const newTask = {
            id : updateId || uuidv4(),
            Title : title,
            Description : description,
            Status : status,
            DueDate: dueDate,
        }

        if(updateId){
            const updatedTasks = tasks.map(each => each.id === updateId ? newTask : each)
            setTasks(updatedTasks)
            localStorage.setItem("Tasks",JSON.stringify(updatedTasks))
        }else{

            setTasks((prev) => {
                const updatedTasks = [...prev, newTask];
                localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
                return updatedTasks;
            });
        }   
            setTitle("")
            setDescription("")
            setStatus("Pending")
    
        
    }

    const addTitle = (event) =>{
        setTitle(event.target.value)
    }

    const addDescription = (event) =>{
        setDescription(event.target.value)
    }

    const addStatus = (event) =>{
        setStatus(event.target.value)
    }

    return(
        <div className="task-form">
            <section className="navbar">
                <h1>Task Manager</h1>
            </section>
            <section className="input-section">
                <form className="input-form" onSubmit={addTask}>
                    <h1 className="heading-main">Enter Your Task and Click Submit</h1>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Title" value={title} onChange={addTitle}/>
                    <label htmlFor="description">Description</label>
                    <input id="description" type="text" placeholder="Description" value={description} onChange={addDescription}/>
                    <label htmlFor="dueDate">Due Date</label>
                    <input  id="dueDate" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
                    <label htmlFor="status">Status</label>
                    <select id="status" value={status}  onChange={addStatus}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <div className="button-submit">
                    <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
            <section className="display-section">
                <div className="mainpage">     
                        {tasks.map(each =>(
                            <NoteList key={each.id} task={each} deleteTask={deleteTask} updateTask={updateTask}/>
                        ))}   
                </div>
            </section>
        </div>

    )

}

export default NoteForm