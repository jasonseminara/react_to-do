# Dynamic React: Function Composition and Component Reusability
### Learning Objectives
 - [ ] Use function composition to simplify complex behavior
 - [ ] Create layers of abstraction to hide and contain complexity
 - [ ] Construct and implement React Child Nodes

Welcome back to "Wiring up React for fun and profit". We now have a one-way connection from our form to our list. Put another way, our lists are reacting to the change in our `App`'s state.

##### Not quite there yet.
But, our lists aren't accurate: one list is supposed to show open (uncompleted) tasks, while the other is supposed to show closed (completed) tasks. Let's implement a way to keep the lists sorted by completion status. 

> ##### Check for Understanding 
> Before you continue, take a hard look at what actually differentiates the lists. How can we `.filter()` the lists to keep only the items we want? What would that function look like? 

## Step 1: Sort the Lists
In `TaskList`, before we run the `.map()`, we'll need to filter out the completed tasks. 
>Remember, that [`Array.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) takes a function that allows us to take certain items from an array that match a Boolean expression

#### TaskList.jsx
```javascript
return (
  <div className="list-group">
    {Object.keys(props.tasks)
      .filter(task=>!task.completed)
      .map(createButton)
    }
  </div>
)
```

### Eh, kinda.
This works, but for only one of the lists. We need to somehow do the opposite function on the other list (`!task.completed` vs `task.completed`). The problem we're facing here is that from within the `TaskList` we don't know where we are on the page or how we're being used. Additionally, we _shouldn't_ have this much knowledge. Remember that from inside a stateless function, our only job is to render, not have knowledge about the rest of the application.

### A Better Filter
The solution to the above problem should be solved by our `TaskList`'s parent— the `App`, which holds all the logic and reasoning about the overall application and how each `TaskList` should be implemented. 

In the `App`, let's supply the `TaskList` with a filter function to tell it how to filter itself.
```javascript
<h3>Open Items</h3>
<TaskList
  tasks={this.state.tasks}
  filter={task=>!task.completed}/>

```

```javascript
<h3>Completed Items</h3>
<TaskList
  tasks={this.state.tasks}
  filter={task=>!!task.completed}/>

```
Then, back in `TaskList`, let's just use this new filter passed in from our props. We have one more hurdle to jump through: our `.filter` is looping over keys, not tasks, so let's wrap it with another function that takes the key and returns our task.
```javascript
return (
  <div className="list-group">
    {Object.keys(props.tasks)
      .filter(key=>props.filter(props.tasks[key]))
      .map(createButton)}
  </div>
)

``` 
Test this out and you should see that only the open tasks get populated. 
  1. Add a few tasks using the form
  2. If we open the React dev tool, we can manipulate a task to change it to 'completed' and it should magically jump to the 'completed' list.

> Imagine that in the future, we could implement a third list of deleted tasks. All we would have to do is change the supplied filter function

## Step 2. Completing Tasks
We've got all our functionality, but clicking on the buttons doesn't do anything. Let's fix that. 

### Toggling Tasks
Let's make a mutator for toggling tasks. Clicking any button should swap Boolen value of `task.completed`. 

##### You Do:
  1. In `App`, create a new mutator method that toggles the `completed` key of each task. _Hint: this method is almost identical to the `addTask` method. `previousState.tasks[taskID].completed = !previousState.tasks[taskID].completed`
  2. Update the `TaskList` JSX to include a new prop, `buttonClick` and pass your new method.
  3. Don't forget to `.bind(this)` since we're refrencing `this.state` in the method.


#### Wait! REFACTOR ALERT!
This is starting to get a little visually complicated and verbose. We can do better, my friends. 

  1. Let's promote our `createButton` function in `TaskList` to a React component. From the point of view of the TaskList, its responsibility is to make a list of `Task`s, so let's promote our button to a `Task`.
  2. Create a new stateless, functional component called `Task`.
  3. Move the contents of the `createButton` function (the `<button...>` stuff) into our new `Task`
  4. Make sure you `import` your new `Task.jsx` into `TaskList`.
  5. The keys and the clicks will stay in `TaskList` and the `<button type=` and `className` will be the responsibility of our new `Task`


###### TaskList.jsx
```javascript
import React from 'react'
import Task from './Task.jsx'

const TaskList = props=>

  <div className="list-group">
    {Object.keys(props.tasks)
      .filter(taskID=>props.filter(props.tasks[taskID]))
      .map(taskID=>
        <Task
          key={taskID}
          onClick={event=>props.buttonClick(taskID)}
          task={props.tasks[taskID]} />
      )}
  </div>

export default function TaskList
```

###### Task.jsx
```javascript

import React from 'react'

const Task = props=>
  <button 
    type="button"
    className="list-group-item"
    onClick={props.onClick}>
      {/* text on the button */}
      <strong>{props.task.name}</strong> {props.task.desc}

      {/* any children given to me shall be rendered here */}
      {props.children}
  </button>


export default Task

```
> Notice that `Task` has no direct access to `key` only `props.task`, and any children passed in. 


Notice that in the layout reference, only the completed `TaskList` contains a 'delete button'. How can we add specific links to only one instance of `TaskList`? 

##### You Do (10 minutes):
  1. Create `App.toggleDelete(taskID)` method.
  2. This method should be almost the same as `toggleTask`, except we're going to toggle `this.state[taskID].deleted` 

## Step 3. Create Child Nodes

Open up  `layout.html` and take a look at the relationship between the `<button />` and its child links (the `delete` and `edit` links). It's a parent/child relationship. When we nest JSX (like XML or HTML), we create a parent/child relationship: the nested child JSX is referenced by the parent as `props.children`. Each of our `Task`s has varying quantities of children, depending within which `TaskList` it appears. For example, `Task`s in the 'open' `TaskList`, contain one child (edit), while `Task`s in the 'completed' list contain two children (edit & delete). We should be able to declare and pass the children from `App` down into our `TaskList` factory and have them applied to each `Task`. Let's create a new component to wrap our links. 

##### Stop and Think
>Since our children are simply `<a />` tags, you might be tempted to skip the creation of a new component, and just use an `<a />` tag, but you'd be running into a world of issues: 
  1. How would we be able intercept the click from the link? We'd be moving the responsibility of managing the event propagation to some other component, making our app much more complex and sloppy.
  2. Even though a naked (non-component) `<a />` tag is legal here, we'd be missing out on the opportunity to treat all our icon links exactly the same way. 

#### You Do:
  1. Create a new stateless component called `IconButton.jsx` (Use one of the delete html links from `layout.html`).
  2. Within the `IconButton` function, create another function, `handleClick(event)`, that will intercept the click and prevent both the link and the button from being pressed simultaneously (`event.stopPropagation()`), and then fire the click event passed in by props using our current `props.id`. 
  5. Include your newly-minted `IconButton` as a child of `TaskList`
  6. Give `IconButton` a new `click` prop  to pass in the `toggleDelete` action. 
  7. Your child `IconButton` won't yet work, but `App` should look like this:

>Like the form, we want to stop the event propagation. Why, you ask? If you remember back to JS 101, events b and fire the `click` provided by the props (we'll cover the click event next).
  
```javascript
...
  {/* COMPLETED ITEMS */}
  <article className="col-md-5">
    <h3>Completed Items</h3>
    <TaskList
      tasks={this.state.tasks}
      filter={task=>!!task.completed&&!task.deleted }
      buttonClick={this.toggleTask.bind(this)}>

      <IconButton click={this.toggleDelete.bind(this)} />
    
    </TaskList>
  </article>
...
```
## Step 4. Passing Child Nodes

### TaskList is actually a `button` (Task) Factory
In the steps above, we've successfully wired up the JSX, and passed the appropriate props to our components, but it still doesn't work properly. If you look closely inside the `TaskList`, you'll see that its primary goal is to iterate over `state.tasks` and generate new `Task`s (buttons)... or even `IconButton`s.

>Technically, this creational pattern is called a [Factory Pattern](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)), wherein we have a method that generates other objects. From the point of view of the `App`, `TaskList` is a [black box](https://en.wikipedia.org/wiki/Black_box): we give it as input some raw ingredients, and it outputs some useful, decorated objects. The key to this pattern is that we didn't tell the factory _how_ to create the object, just gave it some stuff to build.


From within the `TaskList`, we can take these raw ingredients and build a `Task` with each iteration.


```javascript

/*BAD EXAMPLE*/
const TaskList = props=>

  <div className="list-group">
    {Object.keys(props.tasks)
      .filter( taskID=>props.filter(props.tasks[taskID]) )
      .map(taskID=>
        <Task
          key={taskID}
          onClick={event=>props.buttonClick(taskID)}
          task={props.tasks[taskID]}>

          /* WRONG; Our child's click event isn't bound to **this** taskID */
          {props.children}
        </Task>
      )}
  </div>

```

>This code has a serious problem; our `deleteTask` function has no idea about the `taskID` of the button it's sitting on. In order to work as expected, `deleteClick` (like `buttonClick`) needs a specific `taskID` to operate. 

Like `onClick`, we should wrap `deleteTask` in another function to capture this current `taskID` (actually creates a closure around each `taskID`). However, `props.children` is _immutable_ (READ-ONLY), so we can't change any of its props or events. In order to modify these kids, we need to clone them.


## Step 6. Cloning Child Nodes
In `TaskList`, we've been given everything we need by our parents to actually clone the child item(s). Let's clone our children dynamically and assign them anything we want at our new creation-time. 

>Is this another factory (within-a-factory)??

###### TaskList.jsx

```javascript

import React from 'react'
import Task from './Task.jsx'

const cloneAndAssignClickHandler = (children, id) =>
  React.Children.map(children, child=>
    /* We have to clone our children because props are READ-ONLY*/
    React.cloneElement(child, {
      /* our child needs some modified behavior*/
      click: () => child.props.click(id)
    })
  )


const TaskList = props =>
  <div className="list-group">
    {Object.keys(props.tasks)
      .filter(taskID => props.filter(props.tasks[taskID]) )
      .map(taskID =>

        <Task
          key={taskID}
          onClick={event => props.buttonClick(taskID)}
          task={props.tasks[taskID]}>

          {cloneAndAssignClickHandler(props.children, taskID)}

        </Task>
      )}
  </div>

export default TaskList
```
>Note `props.children` is an [opaque data structure](https://facebook.github.io/react/docs/top-level-api.html#react.children), meaning that it may be an array or object. We use `React.Children.map` to help us iterate over 0..n children without an error.

In keeping things tidy, we've exiled our cloning operation and exposed only what is necessary, the ref to the `props.children` and the current`taskID`. **This will effectively "modify" our child by updating its `click` to a function that is bound by our current `taskID`.**

