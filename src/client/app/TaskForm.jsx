const TaskForm = props=> {

  const size = props.size || 'lg'

  const handleSubmit = event=>{
    event.preventDefault();
    // fired the App's prop function
    props.saveTask(
      event.target.elements.taskName.value,
      event.target.elements.taskDesc.value
    );

    // clear the form
    event.target.reset();

    // just for completeness, we should return something
    return false;
  }


  return (
      <form className="form-inline" onSubmit={handleSubmit}>

        <div className="form-group">
          <label className="sr-only" htmlFor="taskName">Task Name</label>
          <input type="text" className={`form-control input-${size}`} name="taskName" placeholder="Task Name" defaultValue={props.task.taskName}/>
        </div>

        <div className="form-group">
          <label className="sr-only" htmlFor="taskDesc">Task Description</label>
          <input type="text" className={`form-control input-${size}`} name="taskDesc" placeholder="Task Description" defaultValue={props.task.taskDesc}/>
        </div>

        {props.children}
      </form>

  )

}
/* PROP TYPES */
TaskForm.propTypes={
  saveTask: React.PropTypes.func.isRequired,
  task: React.PropTypes.object.isRequired,
  /* we might have a child, or an array of children*/
  children:   React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]).isRequired
}

export default TaskForm
