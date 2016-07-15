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
          onClick={
            function(){
              props.action(key)
            }

          }>
            <strong>{props.list[key].task_name}</strong> {props.list[key].task_desc}
          </button>
      ))
    }


    </div>
  )

}

