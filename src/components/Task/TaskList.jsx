import React from 'react';
import Task from './Task';

const TaskList = props => (
  <div className="list-group">
    {
      Object.keys(props.collection)
      .filter(taskID => props.filter(props.collection[taskID]))
      .map((taskID, i) => (
        <Task
          key={i}
          title={props.collection[taskID].name}
          desc={props.collection[taskID].description}
          click={() => props.toggleComplete(taskID)}
        />
      ))
    }
  </div>
);


TaskList.propTypes = {
  collection: React.PropTypes.object.isRequired,
  filter:     React.PropTypes.func.isRequired,

  /* we might have a child, or an array of children*/
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};


export default TaskList;
