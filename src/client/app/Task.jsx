/*Task.jsx*/
// @description Task is implemented as an HTML button

const Task = props=>
  /* pass props down from our parent */
  <button type="button"
    className="list-group-item"
    onClick={event=>props.onClick(props.id)}>

    {/* text on the button */}
    <strong>{props.task.taskName}</strong> {props.task.taskDesc}

    {/* any children given to me shall be rendered here */}
    {props.children}
  </button>

Task.propTypes = {
  id:         React.PropTypes.string.isRequired,
  onClick:    React.PropTypes.func.isRequired,
  task:       React.PropTypes.object.isRequired,
  /* we might have a child, or an array of children*/
  children:   React.PropTypes.oneOfType([
                  React.PropTypes.arrayOf(React.PropTypes.node),
                  React.PropTypes.node
              ])
}

export default Task
