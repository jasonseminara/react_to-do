import React from 'react'

const EditButton = props=>{

  const handleClick = event=>{
    /* kill the link action here */
    event.stopPropagation()
    /*trigger the provided function*/
    props.onClick()
  }

  return (
    <a href="#" className="pull-right" onClick={handleClick}>
      <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    </a>
  )
}

/* PROP TYPES */


export default EditButton
