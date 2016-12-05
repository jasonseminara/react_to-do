import React from 'react';

const Task = props => (
  <button
    type="button"
    className="list-group-item"
    title="Click to Complete"
    onClick={props.click}
  >
    <strong>{props.title}</strong> {props.desc}
  </button>
);


/* PROP TYPES */
Task.PropTypes = {
  title: React.PropTypes.string.isRequired,
  desc:  React.PropTypes.string.isRequired,
  click: React.PropTypes.func.isRequired,
};


export default Task;
