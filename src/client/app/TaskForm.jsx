'use strict'
import React            from 'react';

export default function TaskForm(props) {

  const handleSubmit= event=>{
    event.preventDefault();

    const newTask ={
      name: event.target.elements.task_name.value,
      desc: event.target.elements.task_desc.value
    }

    // fired the App's prop function
    props.addTask(newTask);

    // clear the form

    event.target.reset();
  }

  return (
    <section className="jumbotron">
      <h1>Task Manager</h1>
      <form className="form-inline" onSubmit={handleSubmit} >
        <div className="form-group">
          <label className="sr-only" htmlFor="task_name">Task Name</label>
          <input type="text" className="form-control input-lg" name="task_name" placeholder="Task Name" />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="task_desc">Task Description</label>
          <input type="text" className="form-control input-lg" name="task_desc" placeholder="Task Description" />
        </div>

        <button type="submit" className="btn btn-primary btn-lg">Add Task</button>
      </form>
    </section>

  )


}
