import React from 'react'
import Nav              from './Nav.jsx'
import Footer           from './Footer.jsx'
export default class App extends React.Component{
  constructor() {
    // we also need to wake up our ancestors
    super();
  }

  render(){
    return (
    <container>
        <header>
          <Nav />
        </header>
        <div className="container">
          {/* add this */}
          {this.props.children}
        </div>
        <Footer />
      </container>
      )
  }
}
