/* global fetch:false */

export default class AjaxAdapter {

  constructor(api) {
    this.API_URL = api;

    // we'll be using this header a LOT below
    this.jsonHeader = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    // custom function to convert an array into a obj literal
    // indexed by keys of our choosing
    this.indexByKeyName = (arr, keyName) =>
      arr.reduce((obj, el) => ({ ...obj, [el[keyName]]: el }), {});
  }

  getTasks() {
    return fetch(`${this.API_URL}/tasks`)
      .then(r => r.json())
      .then(data => this.indexByKeyName(data, 'id'));
  }

  createTask(newTask) {
    return fetch(`${this.API_URL}/tasks`, {
      ...this.jsonHeader,
      method: 'POST',
      body:   JSON.stringify(newTask),
    })
    .then(r => r.json());
  }

  toggleField(field, id) {
    return fetch(`${this.API_URL}/tasks/${id}/toggle`, {
      ...this.jsonHeader,
      method: 'PATCH',
      body:   JSON.stringify({ field }),
    })
    .then(r => r.json());
  }

  deleteTask(id) {
    return fetch(`${this.API_URL}/tasks/${id}`, {
      ...this.jsonHeader,
      method: 'DELETE',
    })
    .then(r => r.json());
  }
}
