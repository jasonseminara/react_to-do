// import the libs we need
import ReactDOM         from 'react-dom'
import Nav              from './Nav.jsx'
import Footer           from './Footer.jsx'
import TaskForm         from './TaskForm.jsx'
import TaskList         from './TaskList.jsx'
import IconButton       from './IconButton.jsx'
import ToggleableTask   from './ToggleableTask.jsx'
/*model*/
import Task             from './model/Task'

// create a React Component called _App_
export default class App extends React.Component{

  // note that classes do **not** have commas between their methods
  // every class gets a constructor.
  // this is where we init the state.
  constructor() {

    // we also need to wake up our ancestors
    super();

    // here's our state
    this.state = {
      tasks : {}
    }
  }



  /* CREATE a task */
  addTask( name,desc ){

    const newTask = new Task(name,desc)

    const newState = {...this.state.tasks}
    newState[newTask.taskID]=newTask
    this.setState({tasks:newState})

  }

  updateTask( id,name,desc ){

    const newState = {...this.state.tasks}

    newState[id].taskName = name
    newState[id].taskDesc = desc
    this.setState({tasks:newState})

  }

  toggleTaskForm(id){
    const newState = {...this.state.tasks}
    newState[id].formOpen = !newState[id].formOpen
    this.setState({tasks:newState})
  }

  getTask(id){
    return this.state.tasks[id]
  }

  /*TODO: THIS SHOULD BE REFACTORED, since these are 99% identical */

  /* open/close a task. Note, we only need to ID to make this work */
  toggleCompleted(taskID){
    this.setState( previousState=>{
      // toggle the completed state of the task
      previousState.tasks[taskID].completed = !previousState.tasks[taskID].completed
      return previousState
    })
  }

  toggleDelete(taskID){
    this.setState( previousState=>{
      // toggle the completed state of the task
      previousState.tasks[taskID].deleted = !previousState.tasks[taskID].deleted
      return previousState
    })
  }

  // 90% of your components will render()
  // REMEMBER you can only return **one** root element from a render fn.
  render(){
    return(
      <container>

        <header>
          <Nav />
        </header>

        <div className="container">
          <section className="row">

            {/* TASK FORM */}
            <section className="jumbotron">
              <h1>Task Manager</h1>

              <TaskForm saveTask={this.addTask.bind(this)} task={{}}>
                <button type="submit" className="btn btn-danger btn-lg">Add Task</button>
              </TaskForm>

            </section>

            {/*OPEN ITEMS*/}
            <article className="col-md-5">
              <h3>Open Items</h3>

              <TaskList
                filter={task=>!task.completed && !task.deleted}
                items={this.state.tasks}>

                <ToggleableTask
                  saveTask={this.updateTask.bind(this)}
                  closeTaskForm={this.toggleTaskForm.bind(this)}
                  onClick={this.toggleCompleted.bind(this)}>
                  <IconButton
                    onClick={this.toggleTaskForm.bind(this)} icon="pencil" />
                </ToggleableTask>

              </TaskList>

            </article>


            {/* COMPLETED ITEMS */}
            <article className="col-md-5">
              <h3>Completed Items</h3>

              <TaskList
                filter={task=>!!task.completed && !task.deleted }
                items={this.state.tasks}>

                <ToggleableTask
                  onClick={this.toggleCompleted.bind(this)}
                  saveTask={this.updateTask.bind(this)}
                  closeTaskForm={this.toggleTaskForm.bind(this)}>

                  <IconButton onClick={this.toggleDelete.bind(this)} icon="trash" />
                  <IconButton onClick={this.toggleTaskForm.bind(this)} icon="pencil" />

                </ToggleableTask>

              </TaskList>
            </article>


          {/* DELETED ITEMS */}
            <article className="col-md-2">
              <h3>Deleted Items</h3>

              <TaskList
                filter={task=>!!task.deleted}
                items={this.state.tasks}>

                <ToggleableTask onClick={this.toggleDelete.bind(this)}>
                  <IconButton onClick={this.toggleDelete.bind(this)} icon="remove" />
                </ToggleableTask>

              </TaskList>

            </article>

          </section>
        </div>

        <footer className="footer">
          <Footer />
        </footer>

      </container>
      )
  }
}

// mount our App at #container
ReactDOM.render(<App/>, document.querySelector('#container'))
