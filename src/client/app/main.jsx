require('bootstrap/dist/css/bootstrap.css');
require('../css/styles.css')
require('../images/GA_logo.png')
require('../images/GA_gear.png')
import React            from 'react'
import ReactDOM         from 'react-dom'
import App              from './App.jsx'
import TodoApp          from './TodoApp.jsx'
import LoginForm        from './LoginForm.jsx'
import CreateUserForm   from './CreateUserForm.jsx'
import { Router, Route, browserHistory } from 'react-router'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/todo" component={TodoApp}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/newUser" component={CreateUserForm}/>
    </Route>
  </Router>, document.querySelector('#container'))
