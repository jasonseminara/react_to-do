# Static React
### Learning Objectives
 - [ ] Decompose a static HTML design layout into React components
 - [ ] Investigate the difference between Stateful React Classes and Stateless React Functions
 - [ ] Construct application dependencies for Webpack compilation
   

## Step 1. Start Ye Some React (Partner Time!)

**Find a partner with whom you have not yet worked**

We need to plan our React components. React components come in two major varieties: 
  1. Full React Class-based components that represent _state_.
  2. Light-weight Function-based components that receive _props_, **but no state**. 

Open `starter_resources/layout.html` in Chrome. 
  1. Diagram the major parts of the application. 
  2. What are the smallest functioning parts of this layout we can represent?
  3. Identify items that are repeated. Can these items be created in the abstract and reused in many places?
  4. Your application should only have one central source of truth: **the state**. How will you represent the state of the tasks?
  5. What's the main difference between the lists? Can this be generalized?
  6. BONUS: How does the state of the database correlate with the state of the application?

### Step 2 
Let's start creating our first React components. We'll need the proper folder layout that webpack is expecting:

```
/src
└── client
    ├── app
    │   ├── App.jsx
    │   └── main.jsx
    ├── css
    │   └── styles.css
    └── helpers
    |   └── util.js
    └── images
        └── GA_gear.png
        └── GA_logo.png
```

  1. `/src/client/app` is where your application source will live. 
  2. Webpack will start looking at `/src/client/app/main.jsx` to begin the compilation. 
  2. `App.jsx` is the 'root' of your React application
  3. Create a blank file `/src/client/helpers/util.js` (git ignores empty folders, we'll fill it out later)


### Step 3

In `main.jsx`, we need to make some declarations about which files/assets we'll need in our project. These should be pretty self-explanatory. _(note that the `import` syntax is part of es6's package management feature, while `require` is npm's)_

```
import App from './App.jsx';
require('bootstrap/dist/css/bootstrap.css');
require('../css/styles.css')
```



We'll need to create a wrapper for our _stateful_ core component that uses React. **We'll be using es6 _class_ syntax to build our components.** 

#### Inside `App.jsx` 
```
// import the libs we need
import React            from 'react';
import ReactDOM         from 'react-dom'

// create a React Component called _App_
export default class App extends React.Component{

    // note that es6 classes do **not** have commas between their methods

    // 90% of your components will render()
    // REMEMBER you can only return **one** root element from a render fn.
    render(){
        return(
            <container>
                <header>
                    <nav>navigation here</nav>
                </header>
                <div className="container">
                    <div className="row">
                    {/*everything goes in here*/}
                        <p>Hello world example</p>
                    </div>
                </div>
            </container>
        )
    }
}

// mount our App at #container
ReactDOM.render(<App />, document.querySelector('#container'))
```

**NOTE** Certain HTML attributes interfere with React. As such, we cannot use `class=` or `for=`, instead use `className=` and `htmlFor=` respectively.


##Get organized
_NOTE:_ Before we continue, it will be easier to have three (3) terminal windows open to the same directory. This will allow us to work without swapping tons of windows. It might also be a good idea to open your browser to full-screen on another desktop. Also, now would be a good time to make sure your database is running. 

We'll need each one to do the following:
 1. One for our normal terminal window where we can work with git; 
 2. One for `webpack`, which will watch the `src` folder for changes and auto-rebuild our react app. 
 3. One for `nodemon`, which will watch our root folder for changes and auto-restart our node server (the step above usually triggers this step.) 


### Step 4 The easy parts
Let's convert some of the easiest parts of the site into React.

The most trivial part of the website is the navigation bar. The nav bar doesn't and shouldn't have a concept of _state_; it should only receive props that were given to it by the caller.

Let's create the Nav component as a _stateless function_: `/src/client/app/Nav.jsx`.

```
export default function Nav(props){
  return 
  <nav>
    {/* slice out the nav from the layout template.*/}
  </nav>
}
``` 
or in pure es6
```
export default Nav = (props) => {
  <nav>
    {/* slice out the nav from the layout template.*/}
  </nav>
}
```

Make sure to **`import`** this new component in `App.jsx`, and use the appropriate JSX tag in your App. Test your syntax by slowly adding each component one-by-one, and fixing any errors.

> The most common mistake here is to use the HTML `class=` attribute. JSX does **not** like this. Change all the `class=` attributes to `className=`.


### Step 5 The Rest

Repeat the steps above to build out the rest
  1. `Footer`
  2. `TaskForm`
  3. `TaskList`

**Protip** Only the `App` should be a class with state, all the other components should be stateless functional components that accept `props`.
