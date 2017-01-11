import React from 'react';
import './Task.css';

const Task = props => (
  <button
    type="button"
    className="list-group-item"
    title="Click to Complete"
    onClick={() => props.onClick(props.task.id)}
  >
    <span>
      <strong>{props.task.name}</strong>
      <p>{props.task.description}</p>

      {/* Render any children that were passed to me */}
      <span>
        {props.children}
      </span>
    </span>
  </button>
);

/* PROP TYPES */
Task.PropTypes = {
  title:   React.PropTypes.string.isRequired,
  desc:    React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  task:    React.PropTypes.shape({
    formOpen: React.PropTypes.bool,
    name:     React.PropTypes.string.isRequired,
    id:       React.PropTypes.number.isRequired,
  }).isRequired,
  /* we might have a child, or an array of children*/
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default Task;
