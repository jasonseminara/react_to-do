import React from 'react';


function cloneItem(taskID, props, extraProps){
  return React.Children.map( props.children, (child) => {

    /* props.children is READ-ONLY so we have to clone the child in order to give it an ID */
    return React.cloneElement(child, extraProps,
      cloneItem(taskID, child.props, extraProps)
    )
  })
}

const TaskList = props =>
  /* Loop over the collection,
     fiter out items we dont want
     then render using the functions above */
  <div className="list-group">
    {Object.keys(props.collection)
      .filter(taskID =>
        props.filter(props.collection[taskID])
      )
      .map(taskID =>
        cloneItem(taskID, props, { task: props.collection[taskID] })
      )
    }
  </div>



TaskList.propTypes = {
  collection: React.PropTypes.object.isRequired,
  filter:     React.PropTypes.func.isRequired,

  /* we might have a child, or an array of children*/
  children:   React.PropTypes.oneOfType([
                React.PropTypes.arrayOf(React.PropTypes.node),
                React.PropTypes.node
              ]),
};

export default TaskList;
