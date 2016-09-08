import App from './App.jsx';
import ReactDOM         from 'react-dom'
require('bootstrap/dist/css/bootstrap.css');
require('../css/styles.css')
require('../images/GA_gear.png')
require('../images/GA_logo.png')
require('../images/favicon.ico')

// mount our App at #container
ReactDOM.render(<App/>, document.querySelector('#container'))
