# Dynamic React, Pt 3
### Learning Objectives
 - [ ] Use PropTypes to ensure our components are used correctly
 - [ ] Repurpose existing components in new ways to create new behavior.

## Step 1. PropTypes
Now that we have a fairly complex application that passes lots of props around, how can we be sure that our application is behaving properly? How can we be sure that the user supplied all the correct props to our components?

### Prop validation using PropTypes
[React gives us numerous ways](https://facebook.github.io/react/docs/reusable-components.html) to ensure our components are being used correctly. This 'self-testing' and _validation_ is crucial to debugging as your application grows in complexity.

Both React classes and react functional components use the same syntax:
For example, after the declaration of the class or function:

```javascript
TaskForm.propTypes = {
  addTask: React.PropTypes.func.isRequired
}
```

#### You Do (Add PropTypes):
  1. Take a look at each component you've created and declare the types of their properties, and whether the property is *required*. (See https://facebook.github.io/react/docs/reusable-components.html)



## Step 2. BONUS LAB: Make each `Task` Editable (1 hour)
We should be able to update any of the tasks once they've been created. We should be able to click on a `task`, edit and submit it, all from the same view.

Before we implement any features, let's review how everything is tied together: 
  1. Our `App` renders three `TaskList`s
  2. Each `TaskList` receives a filter, and a list of tasks
  3. Each filtered `TaskList` renders a `Task` for each task matching the filter.
  
Our plan is to modify step 3 above, such that:
  - Each filtered `TaskList` renders a `Task` or a `TaskForm` for each task matching the filter, depending on its _toggled_ state.


### Stop and Think (Let's Plan)! 
Which component should be responsible for toggling this control? Where should the _state_ of the toggled task be held? What are the dis/advantages of giving each Task its own `toggled` state?  
>Turn and talk: Take 5 minutes and discuss the pros/cons of either storing the state of all the tasks centrally vs having each Task carry its own state? How does this affect the rendering of each item?


#### User stories
  1. As a user, I should be able to **click** an `edit` button on a completed or open task to reveal a form in which to edit the current task.
  2. As a user, I should be able to **edit** the `name` and `description` of any task.
  3. As a user, I should be able to **cancel** editing the task, which will restore the task to its previous state.


#### Guidelines 
There are a few things to note and a few decisions to make. 
  1. Each new Task now needs to know whether it's toggled open (the form) or closed (the normal button). Where should this state be held? What does that function look like?
  2. Our `TaskList` needs to render out either a `Task` or `TaskForm` depending on some state.
  3. Our new _inline_`TaskForm` is slightly different than the large `TaskForm`. Also, it contains different buttons and those buttons have different functions attached to them. How can we paramaterize the `TaskForm` such that it behaves differently in each situation? 
    - _HINT: we can pass buttons in as children_
  4. Submitting the inline `TaskForm` should update the task and also toggle the form.
  5. Canceling the inline `TaskForm` should reset and toggle the form back to the closed state.
    - note: make sure no changes are saved.
