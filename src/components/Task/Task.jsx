import React from 'react';

const Task = props => (
  <button
    type="button"
    className="list-group-item"
    title="Click to Complete"
    onClick={event => props.onClick(props.task.id)}
  >
    <strong>{props.task.name}</strong> {props.task.description}

    {/* Render any children that were passed to me */}
    {props.children}
  </button>
);

/* PROP TYPES */
Task.PropTypes = {
  title: React.PropTypes.string.isRequired,
  desc:  React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default Task;
