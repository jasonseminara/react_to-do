import React          from 'react';
import Nav            from '../Nav/Nav';
import TaskForm       from '../TaskForm/TaskForm';
import TaskList       from '../Task/TaskList';
import ToggleableTask from '../ToggleableTask/ToggleableTask';
import Task           from '../Task/Task';
import IconButton     from '../IconButton/IconButton';
import Footer         from '../Footer/Footer';
import AjaxAdapter    from '../../helpers/AjaxAdapter';
import Auth           from '../../helpers/Auth';

import './App.css';
import './GA_gear.png';

export default class App extends React.Component {

  constructor() {
    super();

    this.doError = (e) => {
      // TODO: tie this to the state
      console.log(e);
      // AjaxAdapter.clearToken();
    };

    this.state = {
      tasks:       {},
      lastContact: Date.now(),
      isLoggedIn:  Auth.isUserAuthenticated(),
    };

    this.ajaxAdapter = new AjaxAdapter(process.env.API_URL);

    /* bind all our functions */
    this.addTask = this.addTask.bind(this);
    this.updateStateWithNewTask = this.updateStateWithNewTask.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.login = this.login.bind(this);
    this.hardDelete = this.hardDelete.bind(this);

    /* We'll bind \this\ and curry the function with the first param set */
    this.toggleComplete = this.toggleField.bind(this, 'completed');
    this.toggleDelete = this.toggleField.bind(this, 'deleted');
    this.toggleForm = this.toggleForm.bind(this);
  }


  // this is right after the component is mounted on the screen
  componentDidMount() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.ajaxAdapter.getTasks()
      .then((allTasks) => {
        this.setState({
          tasks:       allTasks,
          lastContact: Date.now(),
        });
      })
      .catch(this.doError);
  }

  updateStateWithNewTask(newTask) {
    // clone existing state
    const newState = { ...this.state.tasks };

    // update with new task
    newState[newTask.id] = newTask;
    this.setState({
      tasks:       newState,
      lastContact: Date.now(),
    });
  }

  login(user) {
    /* since we're reusing the taskform, we'll need to rename the fields */
    /* {name,desc} --> {email,password} */
    this.ajaxAdapter.login({
      email:    user.name,
      password: user.desc,
    })
    .catch(this.doError);
  }

  addTask(task) {
    this.ajaxAdapter.createTask(task)
      .then(this.updateStateWithNewTask)
      .catch(this.doError);
  }

  toggleForm(id) {
      // clone existing state
    const newState = {
      ...this.state.tasks,
    };

    newState[id].formOpen = !newState[id].formOpen;

    this.setState({
      tasks: newState,
    });
  }

  toggleField(field, id) {
    this.ajaxAdapter.toggleField(field, id)
      .then(this.updateStateWithNewTask)
      .catch(this.doError);
  }

  hardDelete(id) {
    this.ajaxAdapter.deleteTask(id)
    .then(() => {
      // clone existing state
      const newState = {
        ...this.state.tasks,
      };

      // delete the item from the state
      delete newState[id];

      // update the state
      this.setState({
        tasks:       newState,
        lastContact: Date.now(),
      });
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

          <TaskForm onSubmit={this.login} size="sm">
            <button type="submit" className="btn btn-sm">Login</button>
          </TaskForm>

          {/* Add a Task Form */}
          <section className="jumbotron">
            <h1>Task Manager</h1>
            <TaskForm onSubmit={this.addTask}>
              <button type="submit" className="btn btn-danger btn-lg">Add Task</button>
            </TaskForm>
          </section>

          {/* to do lists */}
          <section className="row">

            {/* OPEN TASKS */}
            <article className="col-md-4">
              <h3>Open Items</h3>
              <TaskList
                filter={task => !task.completed && !task.deleted}
                collection={this.state.tasks}
              >

                <ToggleableTask
                  saveTask={this.updateTask}
                  closeTaskForm={this.toggleForm}
                  onClick={this.toggleComplete}
                >
                  <IconButton onClick={this.toggleForm} icon="pencil" />
                </ToggleableTask>

              </TaskList>
            </article>

            {/* COMPLETED TASKS  */}
            <article className="col-md-4">
              <h3>Completed Items</h3>
              <TaskList
                filter={task => !task.deleted && task.completed}
                collection={this.state.tasks}
              >

                <ToggleableTask
                  saveTask={this.updateTask}
                  closeTaskForm={this.toggleForm}
                  onClick={this.toggleComplete}
                >
                  <IconButton onClick={this.toggleForm} icon="pencil" />
                  <IconButton onClick={this.toggleDelete} icon="trash" />
                </ToggleableTask>

              </TaskList>
            </article>

            {/* DELETED TASKS */}
            <article className="col-md-4">
              <h3>Deleted Items</h3>
              <TaskList
                filter={task => task.deleted}
                collection={this.state.tasks}
              >

                <Task onClick={this.toggleDelete}>
                  <IconButton onClick={this.hardDelete} icon="remove" />
                </Task>

              </TaskList>
            </article>
          </section>
        </main>

        <footer>
          <Footer
            reload={this.getAllTasks}
            lastContact={this.state.lastContact}
          />
        </footer>

      </container>
    );
  }
}
