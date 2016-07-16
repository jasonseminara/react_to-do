export default class AjaxAdapter{

  constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work, bru.";
  }

  getTasks(){
    return fetch('/tasks')
      .then( r=> r.json() )
  }

  createTask(newTask){
    return fetch('/tasks',{
      method:'post',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newTask)
    })
    .then( r=> r.json() )
  }

  updateTask(task){
    return fetch(`/tasks/${task.task_id}`,{
      method:'PUT',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(task)
    })
    .then( r=> r.json() )
  }

  deleteTask(id){
    return fetch(`/tasks/${id}`,{
      method:'DELETE',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then( r=> r.json() )
  }

}
