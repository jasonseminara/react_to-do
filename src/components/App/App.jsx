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
    .catch((error) => {
        throw error;
    });
  }

  addTask(name, desc) {
    AjaxAdapter.createTask({ name, desc })
    .then((newTask) => {
      // clone existing state
      const newState = { ...this.state.tasks };
      newState[newTask.id] = newTask;
      this.setState({ tasks: newState });
    })
    .catch((error) => {
      throw error;
    });
  }

  toggleComplete(id) {
    const newState = { ...this.state.tasks };
    newState[id].completed = !newState[id].completed;
    this.setState({ tasks: newState });
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
            <TaskForm addTask={this.addTask} />
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
