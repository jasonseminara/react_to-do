# Dynamic React

### Learning Objectives
 - [ ] Design the flow of data in a React application
 - [ ] Investigate when to use state vs. props
 - [ ] Justify storing Objects with keys as state instead of array

 
## Where are we now?
Now that you have the template sliced up into React, we should be able to `npm run rebuild` to rebuild the app. 

Your `App.jsx` should look something like this:

```javascript
// import the libs we need
import React            from 'react'
import ReactDOM         from 'react-dom'
import Nav              from './Nav.jsx'
import Footer           from './Footer.jsx'
import TaskForm         from './TaskForm.jsx'
import TaskList         from './TaskList.jsx'

// create a React Component Class called _App_
export default class App extends React.Component{

  // every class gets a constructor.
  // this is where we init the state.
  constructor(props) {

    // we also need to wake up our ancestors
    super(props);

    // here's our state
    this.state = {
      tasks : {},
    };
  }

  // ... other stuff here

  // 90% of your components will render()
  // REMEMBER you can only return **one** root element from a render fn.
  render(){
    return(
      <container>
        <header>
          <Nav />
        </header>
        <div className="container">
          <TaskForm />
          <section className="row">

            {/*OPEN ITEMS*/}
            <article className="col-md-6">
              <h3>Open Items</h3>
              <TaskList />
            </article>


            {/* COMPLETED ITEMS */}
            <article className="col-md-6">
              <h3>Completed Items</h3>
              <TaskList />

            </article>

          </section>
        </div>
        <footer>
          <Footer />
        </footer>
      </container>
      )
  }
}

// mount our App at #container
ReactDOM.render(<App/>, document.querySelector('#container'))

```

### Please Explain!

Notice that our `App` has a `constructor` which is the method that runs when the class is instantiated. This is the perfect place to initialize our _state_. Our App is the container for our application and should be the only thing that manages the state for our app. The rest of our components will simply receive `props`, or references to methods (_mutators_ and/or _accessors_ of the state). 

The other components we've built should be `import`ed here (see `Nav`, `TaskList`, `TaskForm`,`Footer`). We'll instantiate these components using JSX syntax.
> JSX is an XML-compliant shortcut for creating React components
> see https://facebook.github.io/react/docs/jsx-in-depth.html



# Make it Dynamic
Now that we have all the components in place and organized we can start making this dynamic.

>You're still watching using `npm run watch`, right??. 

## Step 1: Build out the TaskForm
Let's tackle  ~~our fears~~ our form. Our form should take input and create a new task. Notice that submitting a form automatically reloads the page. This is because the `submit` event bubbles up to the window, and the window responds with a page reload... Let's fix this.

#### The Form
Inside of the `TaskForm` component, we'll need a function that will handle the submission, hide all the complexity and transmit our form's data. Let's call it `handleSubmit`:

```javascript
const TaskForm = props=>{

  /* let's handle all our dirty laundry here, 
  and present a clean face to the rest of the app*/

  const handleSubmit = event=>{
    event.preventDefault();
    console.log('form submitted')
    /* DEV TODO: collect the form elements into an object literal called newTask */
  }

  return (
  <section className="jumbotron">
    <h1>Task Manager</h1>
    <form className="form-inline" onSubmit={handleSubmit}>
...
  )
}

```
>`handleSubmit` lives within the `TaskForm` and serves as a way of managing the form data before it's submitted. 

We'll wire our new method into the form via the `onSubmit` event handler of the form.

#### The Form Data

We need to grab the form data and submit it via AJAX. Conveniently, our form elements are stored in an object called `elements`. 

##### YOU DO: 
  1. Inside `handleSubmit`, create a `newTask` that collects all the form data. 
  2. `console.log` the new object when the form is submitted.
  3. Reset the form.

##### Check for Understanding: 
  1. Why don't we just set the event to trigger when the button is clicked?
  2. Could we just send the entire form to the app and let it figure out what to do? 


### Step 2: Update the State
We have the new task, and we need to update our state. BUT, we need to transmit this data up to our state, and our state is up in the App, but this action is down in the form. What should we do? 

#### Mutators?
Before we go forward, let's first make a new method on our App. We have to make a _mutator_ method that takes `newTask` and updates our state:

##### You Do:
  1. Create a new method in `App.addTask( newTask )` that takes the `newTask` and saves it to the state. Eventually we'll get our tasks from a DB using AJAX, which will come with a completed status and a unique ID, but for now we'll simulate that:
```
    // TODO: send this change to the db (ajax)
    // simulate the completed state and create a unique ID using the surrent timestamp
    newTask.completed = false
    newTask.task_id = Date.now()
```
  2. Our `addTask` method must update (mutate) our state —but— we have a problem: React dictates that we must NEVER directly change the state. One way to get around this is to create a function that describes the transition from the previous state to the next state.
```
this.setState( previousState=>{
  previousState.tasks[newTask.task_id]=newTask
  return previousState
})
```

Now that we have a mutator, let's pass it down through _props_:

### Step 3: Pass Props
We can pass function references down to any component through props (the named attributes of our XML/JSX). For example:
```
<ComponentName propName={functionReference} prop2={f2Reference} />
```
  1. In `App.jsx`, we've instantiated `<TaskForm />`. Let's pass in a reference to this new method we just created. 
  `<TaskForm addTask={this.addTask}/>`
 >Test this and you'll see an immediate error. Why is this happening? The `App.addTask` method references `this.state`. [Remember that](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md) this is dynamic and its value is determined by how its called. When we separate a method from its class/object, and call it as a function in a separate context, `this` loses its meaning. 

 >To fix this, we can `.bind()` the function to the current `this` context.
   2. Let's bind the `addTask` function to its parent object so that we later have access to `App`'s `this` scope: 
   `<TaskForm addTask={this.addTask.bind(this)}/>`
   3. Test and check the React panel to see that the state gets updated.

### Step 4: Pass our State as props to each `TaskList` so they can rerender themselves when the state changes. 
  1. `<TaskList tasks={this.state.tasks} />`

##### You Do:
  1. In `TaskList`, we need to iterate over the tasks and display them as buttons.
  2. Use `[Array].map()` to iterate over our object. (hint `Object.keys()` gets an array of the object's keys)
  3. return a new `<button>` with each iteration. 

>**ProTip:** Be sure to give each new `<button>` a unique key so that React can track it efficiently. 

