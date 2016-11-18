import React from 'react';
import Task from './Task';



const TaskList = props => {


  const generateTasks = collection =>
    Object.keys(collection)
      .filter(taskID => props.filter(collection[taskID]))
      .map((taskID, i) => (
        <Task
          key={i}
          title={collection[taskID].name}
          desc={collection[taskID].description}
          click={() => props.toggleComplete(taskID)}
        />
      ));

      React.Children.map(props.children,
        child=>console.log(child)
      );

  return (
    <div className="list-group">
      {generateTasks(props.collection)}
    </div>
  );
}

export default TaskList;
