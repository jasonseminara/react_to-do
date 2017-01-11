import React    from 'react';
import Task     from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';

export default function ToggleableTask(props) {
  // pass-thru my props down to Task if I'm closed
  if (!props.task.formOpen) {
    return (<Task {...props} />);
  }

  const submitTaskForm = (name, desc) => {
    props.saveTask(props.task.id, name, desc);
    props.closeTaskForm(props.task.id);
  };

  /* If I'm open, show a form */
  return (
    <aside className="well well-sm" key={props.task.id}>
      <TaskForm
        size="sm"
        task={props.task}
        onSubmit={submitTaskForm}
      >

        {/* We'll add two child buttons */}
        {/* Button to submit the form */}
        <button
          type="submit"
          className="btn btn-primary btn-sm"
        >Save</button>

        {/* Button to reset the form */}
        <button
          type="reset"
          className="btn btn-link btn-sm"
          onClick={() => props.closeTaskForm(props.task.id)}
        >Cancel</button>

      </TaskForm>
    </aside>
  );
}

ToggleableTask.propTypes = {
  closeTaskForm: React.PropTypes.func,
  task:          React.PropTypes.shape({
    formOpen: React.PropTypes.bool,
    id:       React.PropTypes.number,
  }),
};
