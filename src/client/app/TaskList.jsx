import React from 'react';

export default function TaskList(props){

  return(
    <div className="list-group">
    {Object.keys(props.list)
      .filter( key=>props.f( props.list[key].completed ))
      .map(key=>(
        <button
          type="button"
          className="list-group-item"
          key={key}
          onClick={event=>props.action(key)}>

            <strong>{props.list[key].task_name}</strong> {props.list[key].task_desc}

            {/* Iterate over the children and bind their clicks to the key  */}
            {React.Children.map(props.children, child=>
              React.cloneElement(child, {
                onClick: event=>{
                  event.stopPropagation();
                  props.deleteTask(key);
                }
              })
            )}
          </button>
      ))
    }

    </div>
  )

}

