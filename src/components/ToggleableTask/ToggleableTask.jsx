import React    from 'react';
import Task     from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';

export default function ToggleableTask(props) {
  // pass-thru my props down to Task if I'm closed
  if (!props.task.formOpen) {
    return (<Task {...props} />);
  }

  /* If I'm open, show a form */
  return (
    <aside className="well well-sm" key={props.id}>
      <TaskForm
        size="sm"
        task={props.task}
        onSubmit={(name, desc) => {
          props.onSubmit(props.id, name, desc);
          props.closeTaskForm(props.id);
        }}
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
          onClick={() => props.closeTaskForm(props.id)}
        >Cancel</button>

      </TaskForm>
    </aside>
  );
}

ToggleableTask.propTypes = {
  id:            React.PropTypes.number.isRequired,
  closeTaskForm: React.PropTypes.func,
  task:          React.PropTypes.shape({
    formOpen: React.PropTypes.bool,
  }).isRequired,
};
