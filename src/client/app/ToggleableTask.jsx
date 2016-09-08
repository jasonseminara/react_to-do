import React      from 'react'
import TaskForm   from './TaskForm.jsx'
import Task       from './Task.jsx'

/* This is a composite component that can be toggled open or closed, depending on its state */
const ToggleableTask = props=>{

  // pass-thru my props down to Task if I'm closed
  if(!props.task.formOpen){
    return <Task {...props} />
  }

  return (
    <aside className="well well-sm" key={props.id}>
      <TaskForm
        size="sm"
        saveTask={(name,desc)=>{
          props.saveTask(props.id,name,desc)
          props.closeTaskForm(props.id)
        }}
        task={props.task}>

        <button type="submit" className="btn btn-primary btn-sm">Save</button>
        <button type="reset"  className="btn btn-link btn-sm" onClick={event=>props.closeTaskForm(props.id)}>Cancel</button>

      </TaskForm>
    </aside>
  )


}


Task.propTypes = {
  onClick:    React.PropTypes.func.isRequired,
  task:       React.PropTypes.object.isRequired,
  /* we might have a child, or an array of children*/
  children:   React.PropTypes.oneOfType([
                  React.PropTypes.arrayOf(React.PropTypes.node),
                  React.PropTypes.node
              ])
}

export default ToggleableTask
