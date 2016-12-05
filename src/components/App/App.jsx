import React     from 'react';
import Nav       from '../Nav/Nav';
import TaskForm  from '../TaskForm';
import Footer    from '../Footer/Footer';
import TaskList  from '../TaskList';
import AjaxAdapter from '../../helpers/AjaxAdapter';

import './App.css';
import './GA_gear.png';


export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      tasks: {},
    };

    /*  */
    this.addTask = this.addTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }


  // this is right after the component is mounted on the screen
  componentDidMount() {
    AjaxAdapter.getTasks()
    .then(allTasks =>
      this.setState({ tasks: allTasks })
    )
    .catch(this.doError);
  }

  doError(e) {
    // placeholder for errors
    throw e;
  }


  updateStateWithNewTask(newTask) {
    // clone existing state
    const newState = { ...this.state.tasks };

    // update with new task
    newState[newTask.id] = newTask;
    this.setState({ tasks: newState });
  }

  addTask(task) {
    AjaxAdapter.createTask(task)
    .then(this.updateStateWithNewTask)
    .catch(this.doError);
  }

  toggleComplete(id) {
    AjaxAdapter.toggleComplete(id)
    .then(this.updateStateWithNewTask)
    .catch(this.doError);
  }

  hardDelete(id) {
    AjaxAdapter.toggleComplete(id)
    .then(() => {
      // clone existing state
      const newState = { ...this.state.tasks };

      // delete the item from the state
      delete newState[id];
      this.setState({ tasks: newState });
    })
    .catch(this.doError);
  }

  render() {
    return (
      <container>
        <header>
          <Nav />
        </header>
        <main className="container">
          <section className="jumbotron">
            <h1>Task Manager</h1>
            <TaskForm
              formData={this.state.taskForm}
              addTask={this.addTask}
              trackForm={this.trackForm} />
          </section>

          {/* to do lists */}
          <section className="row">

            {/* OPEN TASKS */}
            <article className="col-md-4">
              <h3>Open Items</h3>
              <TaskList
                filter={task => !task.completed && !task.deleted}
                collection={this.state.tasks}
                toggleComplete={this.toggleComplete}
              />
            </article>

            {/* COMPLETED TASKS  */}
            <article className="col-md-4">
              <h3>Completed Items</h3>
              <TaskList
                filter={task => !task.deleted && task.completed}
                collection={this.state.tasks}
                toggleComplete={this.toggleComplete}
              />
            </article>

            {/* DELETED TASKS */}
            <article className="col-md-4">
              <h3>Deleted Items</h3>
              <TaskList
                filter={task => task.deleted}
                collection={this.state.tasks}
                toggleComplete={this.toggleComplete}
              />
            </article>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>

      </container>
    );
  }

}
