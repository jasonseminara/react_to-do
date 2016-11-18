function indexByKeyName(arr, keyName) {
  return arr.reduce((obj, el) => {
    obj[el[keyName]] = el;
    return obj;
  }, {});
}

export default class AjaxAdapter{

  static getTasks() {
    return fetch('/tasks')
    .then(r => r.json())
    .then(data => indexByKeyName(data, 'id'));
  }

  static createTask(newTask) {
    return fetch('/tasks', {
      method:  'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newTask)
    })
      .then(r => r.json());
  }

  static deleteTask(id) {
    return fetch(`/tasks/${id}`, {
      method:  'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(r => r.json());
  }
}
