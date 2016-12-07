import React from 'react';

export default function IconButton(props) {

  const handleClick = (event) => {
    /* kill the link action here */
    event.stopPropagation();

    /* trigger the provided function */
    props.onClick(props.task.id);
  };

  return (
    <a className="pull-right" onClick={handleClick}>
      <span className={`glyphicon glyphicon-${props.icon}`} aria-hidden="true" />
    </a>
  );
}

IconButton.propTypes = {
  onClick:    React.PropTypes.func.isRequired,
  icon:       React.PropTypes.string.isRequired,
};
