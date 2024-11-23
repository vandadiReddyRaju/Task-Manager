import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteList from "../NoteList/NoteList";
import "./NoteForm.css";

const NoteForm = () => {
  const data = localStorage.getItem("Tasks");
  const savedTasks = data ? JSON.parse(data) : [];

  const [tasks, setTasks] = useState(savedTasks);
  const [title, setTitle] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [dueDate, setDueDate] = useState(today);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filterId, setFilterId] = useState("All");
  const [sortId, setSortId] = useState("Title");
  const [updateId, setUpdateId] = useState("");
  const [filteredTasks, updateFilteredTasks] = useState(savedTasks); // Initialize filteredTasks state

  const applyFilter = (filterBy, updatedTasks = tasks) => {
    let newTasks = updatedTasks;

    if (filterBy !== "All") {
      newTasks = updatedTasks.filter((task) => task.Status === filterBy);
    }

    updateFilteredTasks(newTasks);
    return newTasks;
  };

  const applySort = (sortedTasks, event) => {
    const newSort = event.target.value;

    const sorted = [...sortedTasks].sort((a, b) => {
      if (newSort === "Title") {
        return a.Title.toLowerCase().localeCompare(b.Title.toLowerCase());
      } else if (newSort === "Due Date") {
        return new Date(a.DueDate) - new Date(b.DueDate);
      }
      return 0;
    });

    updateFilteredTasks(sorted);
  };

  const updateTask = (id) => {
    const taskDetails = tasks.find((task) => task.id === id);
    setUpdateId(id);
    setTitle(taskDetails.Title);
    setDescription(taskDetails.Description);
    setStatus(taskDetails.Status);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
    applyFilter(filterId, updatedTasks);
    applySort(updatedTasks, { target: { value: sortId } });
  };

  const addTask = (event) => {
    event.preventDefault();
    if (title === "" || description === "" || dueDate === "") {
      alert("Enter all the fields");
      return;
    }

    const newTask = {
      id: updateId || uuidv4(),
      Title: title,
      Description: description,
      Status: status,
      DueDate: dueDate,
    };

    let updatedTasks;
    if (updateId) {
      updatedTasks = tasks.map((task) =>
        task.id === updateId ? newTask : task
      );
    } else {
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));

    // Clear form fields
    setTitle("");
    setDescription("");
    setDueDate(today);
    setStatus("Pending");
    setUpdateId("");

    applyFilter(filterId, updatedTasks); // Apply filter after adding/updating task
    applySort(updatedTasks, { target: { value: sortId } }); // Apply sort after adding/updating task
  };

  const addTitle = (event) => {
    setTitle(event.target.value);
  };

  const addDescription = (event) => {
    setDescription(event.target.value);
  };

  const addStatus = (event) => {
    setStatus(event.target.value);
  };

  const addFilter = (event) => {
    const newFilterId = event.target.value;
    setFilterId(newFilterId);
    applyFilter(newFilterId);
    applySort(filteredTasks, { target: { value: sortId } });
  };

  const addSort = (event) => {
    const newSortId = event.target.value;
    setSortId(newSortId);
    applySort(filteredTasks, { target: { value: newSortId } });
  };

  return (
    <div className="task-form">
      <section className="navbar">
        <h1>Task Manager</h1>
      </section>
      <section className="input-section">
        <form className="input-form" onSubmit={addTask}>
          <h1 className="heading-main">Enter Your Task and Click Submit</h1>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={addTitle}
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={addDescription}
          />
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={addStatus}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="filtering">Filter</label>
          <select id="filtering" value={filterId} onChange={addFilter}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="sortby">Sort By</label>
          <select id="sortby" value={sortId} onChange={addSort}>
            <option value="Title">Title</option>
            <option value="Due Date">Due Date</option>
          </select>
          <div className="button-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
      <section className="display-section">
        <div className="mainpage">
          {filteredTasks.map((task) => (
            <NoteList
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NoteForm;
