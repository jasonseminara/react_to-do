import React from 'react';

export default function IconButton(props) {
  const handleClick = (event) => {
    /* kill the link action here */
    event.stopPropagation();
    /* trigger the provided function */
    props.onClick(props.task.id);
    return false;
  };

  return (
    <a>
      <span
        onClick={handleClick}
        className={`glyphicon glyphicon-${props.icon}`}
        aria-hidden="true"
      />
    </a>
  );
}

IconButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  icon:    React.PropTypes.string.isRequired,
  task:    React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
  }),
};
