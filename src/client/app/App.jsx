// import the libs we need
import React            from 'react'
import ReactDOM         from 'react-dom'
import Nav              from './Nav.jsx'
import Footer           from './Footer.jsx'
import TaskForm         from './TaskForm.jsx'
import TaskList         from './TaskList.jsx'
import DeleteButton     from './DeleteButton.jsx'
import EditButton     from './EditButton.jsx'
import Task from './Task.jsx'

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
  addTask( newTask ){

    // TODO: send this change to the db (ajax)
    newTask.completed = false
    newTask.task_id = Date.now()
    newTask.deleted = false

    // const newState = {...this.state.tasks}
    // newState[newTask.task_id]=newTask
    // this.setState(newState)

    this.setState( previousState=>{
      previousState.tasks[newTask.task_id]=newTask
      return previousState
    })
  }


  /*TODO: THIS SHOULD BE REFACTORED, since these are 99% identical */

  /* open/close a task. Note, we only need to ID to make this work */
  toggleTask(task_id){
    this.setState( previousState=>{
      // toggle the completed state of the task
      previousState.tasks[task_id].completed = !previousState.tasks[task_id].completed
      return previousState
    })
  }
  convertEdit(task_id){

  }

  deleteTask(task_id){
    this.setState( previousState=>{
      // toggle the completed state of the task
      previousState.tasks[task_id].deleted = !previousState.tasks[task_id].deleted
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
            <TaskForm addTask={this.addTask.bind(this)}/>
            {/*OPEN ITEMS*/}
            <article className="col-md-5">
              <h3>Open Items</h3>
              <TaskList
                tasks={this.state.tasks}
                filter={task=>!task.completed&&!task.deleted}>

                <Task onClick={key=>this.toggleTask.bind(this,key)} />

              </TaskList>
            </article>


            {/* COMPLETED ITEMS */}
            <article className="col-md-5">
              <h3>Completed Items</h3>
              <TaskList
                tasks={this.state.tasks}
                filter={task=>!!task.completed&&!task.deleted }>

                {/*This will be repeated*/}
                <Task onClick={key=>this.toggleTask.bind(this,key)} >
                  <DeleteButton onClick={key=>this.deleteTask.bind(this,key)} />
                  <EditButton onClick={key=>this.convertEdit.bind(this,key)} onSave={event=>console.log(event.target)}/>
                </Task>

              </TaskList>
            </article>


          {/* DELETED ITEMS */}
            <article className="col-md-2">
              <h3>Deleted Items</h3>
              <TaskList
                tasks={this.state.tasks}
                filter={task=>!!task.deleted}>

                <Task onClick={key=>this.deleteTask.bind(this,key)} />

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
