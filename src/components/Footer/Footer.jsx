import React from 'react';
import './Footer.css';
import moment from 'moment';

const Footer = (props) => {

  function handleClick(event) {
    event.preventDefault();
    props.reload();
  }

  return (

    <div className="footer-copyright">
      <div className="container">
        <p>Made with <span className="glyphicon glyphicon-heart" /> by
          <a href="https://generalassemb.ly/instructors/jason-seminara/6831"> Jason Seminara </a>
          in 2015 for <span className="gaLogo" /> in New York City.
          <br />
          {moment(props.lastContact).format('MMMM Do YYYY, HH:mm:ss')} <a href="" onClick={handleClick}><span className="glyphicon glyphicon-refresh" /></a>
        </p>

      </div>
    </div>
  )
};


export default Footer;
