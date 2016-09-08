// import the libs we need
import React            from 'react'

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

    this.addTask         = this.addTask.bind(this)
    this.updateTask      = this.updateTask.bind(this)
    this.toggleForm      = this.toggleField.bind(this,'formOpen')
    this.toggleCompleted = this.toggleField.bind(this,'completed')
    this.toggleDelete    = this.toggleField.bind(this,'deleted')
    this.hardDelete      = this.hardDelete.bind(this)

  }



  /* CREATE a task */
  addTask( name,desc ){

    const newTask = new Task(name,desc)

    const newState = {...this.state.tasks}
    newState[newTask.taskID]=newTask
    this.setState({tasks:newState})

  }


  /* UPDATE a task */
  updateTask( id,name,desc ){

    const newState = {...this.state.tasks}

    newState[id].taskName = name
    newState[id].taskDesc = desc
    this.setState({tasks:newState})

  }

  /* Toggle any field on a Task */
  toggleField(fieldName,id){
    const newState = {...this.state.tasks}
    newState[id][fieldName] = !newState[id][fieldName]
    this.setState({tasks:newState})
  }

  /* Hard delete on a Task */
  hardDelete(id){
    const newState = {...this.state.tasks}
    delete newState[id]
    this.setState({tasks:newState})
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

              <TaskForm saveTask={this.addTask} task={{}}>
                <button type="submit" className="btn btn-danger btn-lg">Add Task</button>
              </TaskForm>

            </section>

            {/*OPEN ITEMS*/}
            <article className="col-sm-5">
              <h3>Open Items</h3>

              <TaskList
                filter={task=>!task.completed && !task.deleted}
                items={this.state.tasks}>

                <ToggleableTask
                  saveTask={this.updateTask}
                  closeTaskForm={this.toggleForm}
                  onClick={this.toggleCompleted}>
                  <IconButton
                    onClick={this.toggleForm} icon="pencil" />
                </ToggleableTask>

              </TaskList>

            </article>


            {/* COMPLETED ITEMS */}
            <article className="col-sm-5">
              <h3>Completed Items</h3>

              <TaskList
                filter={task=>!!task.completed && !task.deleted }
                items={this.state.tasks}>

                <ToggleableTask
                  onClick={this.toggleCompleted}
                  saveTask={this.updateTask}
                  closeTaskForm={this.toggleForm}>

                  <IconButton onClick={this.toggleDelete} icon="trash" />
                  <IconButton onClick={this.toggleForm} icon="pencil" />

                </ToggleableTask>

              </TaskList>
            </article>


          {/* DELETED ITEMS */}
            <article className="col-sm-2">
              <h3>Deleted Items</h3>

              <TaskList
                filter={task=>!!task.deleted}
                items={this.state.tasks}>

                <ToggleableTask onClick={this.toggleDelete}>
                  <IconButton onClick={this.hardDelete} icon="remove" />
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
