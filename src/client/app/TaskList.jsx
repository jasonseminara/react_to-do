import React from 'react'



const TaskList = props=>

  <div className="list-group">
    {Object.keys(props.tasks)
      .filter( task_id=> props.filter(props.tasks[task_id]) )
      .map( task_id=>

        /* If TaskList was supplied any children,  */
        React.Children.map(props.children, child=>

          /* props.children is READ-ONLY so we have to clone the supplied child
          to give it new functions */
          React.cloneElement(child,{

            /* our functions need our current task_id in order to work properly */
            onClick:child.props.onClick(task_id),
            task:props.tasks[task_id],

            /* If I have any children, update their methods with my context */
            children:React.Children.map(child.props.children, grandChild=>

              React.cloneElement(grandChild,{
                /* our modified functions need our current task_id in order to work properly */
                onClick:grandChild.props.onClick(task_id)
              })
            )
          })
        )
      )}
  </div>

TaskList.propTypes = {
  tasks: React.PropTypes.object.isRequired,
  filter: React.PropTypes.func.isRequired,
  children:React.PropTypes.object.isRequired,
};
export default TaskList
