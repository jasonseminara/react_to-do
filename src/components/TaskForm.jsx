import React from 'react';

export default class TaskForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      taskForm: {
        name: '',
        desc: '',
      },
    };

    this.trackFormName = this.updateStateOnChange.bind(this, 'name');
    this.trackFormDesc = this.updateStateOnChange.bind(this, 'desc');

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // stop the event from leaving the form
    event.preventDefault();

    // fired the App's task function
    this.props.addTask(this.state.taskForm);

    this.setState({ taskForm: {
      name: '',
      desc: '',
    },
    });
    return false;
  }

  updateStateOnChange(key, event) {
    const newState = { ...this.state.taskForm };

    // update with new task
    newState[key] = event.target.value;
    this.setState({ taskForm: newState });
  }


  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" htmlFor="taskName">Task Name</label>
          <input
            type="text"
            className="form-control input-lg"
            value={this.state.taskForm.name}
            onChange={this.trackFormName}
          />
        </div>

        <div className="form-group">
          <label className="sr-only" htmlFor="taskDesc">Task Description</label>
          <input
            type="text"
            className="form-control input-lg"
            value={this.state.taskForm.desc}
            onChange={this.trackFormDesc}

          />
        </div>
        <button type="submit" className="btn btn-danger btn-lg">Add Task</button>
      </form>
    );
  }
}

/* PROP TYPES */
TaskForm.propTypes = {
  addTask: React.PropTypes.func.isRequired,
};
