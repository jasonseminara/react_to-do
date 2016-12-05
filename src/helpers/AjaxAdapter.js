const indexByKeyName = (arr, keyName) =>
  arr.reduce((obj, el) => ({ ...obj, [el[keyName]]: el }), {});

const jsonHeader = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}

export default class AjaxAdapter {

  static getTasks() {
    return fetch('/tasks')
    .then(r => r.json())
    .then(data => indexByKeyName(data, 'id'));
  }

  static createTask(newTask) {
    return fetch('/tasks', {
      ...jsonHeader,
      method: 'POST',
      body:   JSON.stringify(newTask),
    })
    .then(r => r.json());
  }


  static toggleField(field, id) {
    return fetch(`/tasks/${id}`, {
      ...jsonHeader,
      method: 'PATCH',
      body:   JSON.stringify({field}),
    })
    .then(r => r.json());
  }


  static deleteTask(id) {
    return fetch(`/tasks/${id}`, {
      ...jsonHeader,
      method:  'DELETE',
    })
    .then(r => r.json());
  }
}
