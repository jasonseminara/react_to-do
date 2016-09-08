export default class Utils{
  constructor(){}
  static cloneItem(taskID, props, extraProps){
    return React.Children.map( props.children, child=>
      /* props.children is READ-ONLY so we have to clone the child in order to give it an ID*/
      React.cloneElement(
        child,
        extraProps,
        cloneItem(taskID, child.props, extraProps)
      )
    )
  }
}
