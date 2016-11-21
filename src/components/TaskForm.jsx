import React from 'react';

export default function TaskForm(props) {
  const handleSubmit = (event) => {
    // stop the event from leaving the form
    event.preventDefault();

    // get a pointer to the form
    const myForm = event.target;

    // fired the App's task function
    props.addTask(
      myForm.taskName.value,
      myForm.taskDesc.value
    );

    // clear the form
    event.target.reset();

    return false;
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>

      <div className="form-group">
        <label className="sr-only" htmlFor="taskName">Task Name</label>
        <input type="text" className="form-control input-lg" name="taskName" placeholder="Task Name" />
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="taskDesc">Task Description</label>
        <input type="text" className="form-control input-lg" name="taskDesc" placeholder="Task Description" />
      </div>
      <button type="submit" className="btn btn-danger btn-lg">Add Task</button>
    </form>
  );
}

/* PROP TYPES */
TaskForm.propTypes = {
  addTask: React.PropTypes.func.isRequired,
};
