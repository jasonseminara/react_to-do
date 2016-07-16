import React from 'react';

export default function TaskList(props){

  // we need to give the delete button a function of the signature: (event){}
  // however, for the function to operate properly, we need the specific button's key and props
  // we'll create a closure that takes the key and props and returns a fn reference.
  const clickDelete = key=> event=>{
    event.stopPropagation();
    props.deleteTask(key);
  }


  return(
    <div className="list-group">
    {Object.keys( props.list )
      .filter( key=>
        props.sortBy( props.list[key].completed )
      )
      .map(key=>
        <button
          type="button"
          className="list-group-item"
          key={key}
          onClick={event=>props.action(key)}>

          <strong>{props.list[key].task_name}</strong> {props.list[key].task_desc}

          {/* Iterate over the children and bind their clicks to this key  */}
          {/* We have to clone the child b/c props are immutable, and we need a unique fn assigned to this child */}
          {
            React.Children.map(props.children, child=>
              React.cloneElement(child, {
                onClick: clickDelete(key)
              })
            )
          }
        </button>
      )
    }

    </div>
  )

}

