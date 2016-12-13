/* global fetch:false */
/* global Headers:false */
import Auth from './Auth';

export default class AjaxAdapter {

  constructor(api) {
    this.API_URL = api;

    // we'll be using this header a LOT below
    this.jsonHeader = {
      'Content-type': 'application/vnd.api+json',
      Accept:         'application/vnd.api+json',
    };

    this.headerWithToken = () => new Headers({
      ...this.jsonHeader,
      Authorization: `Bearer ${Auth.getToken()}`,
    });

    /* restructure the received data into the shape we expect */
    this.reShapeResponse = r =>
      r.data.map(task => ({
        ...task.attributes,
        id: task.id,
      }));

    // custom function to convert an array into a obj literal
    // indexed by keys of our choosing
    this.indexByKeyName = (arr, keyName) =>
      arr.reduce((obj, el) => ({ ...obj, [el[keyName]]: el }), {});
  }

  /* LOGIN does not require a token; we receive one */
  login(user) {
    return fetch(`${this.API_URL}/auth_user`, {
      headers: this.jsonHeader,
      method:  'POST',
      body:    JSON.stringify(user),
    })
    .then(r => r.json())
    .then(r => Auth.authenticateUser(r.auth_token));
  }

  getTasks() {
    return fetch(`${this.API_URL}/tasks`, {
      method:  'GET',
      headers: this.headerWithToken(),
    })
    .then(r => r.json())
    /* restructure the received data into the shape we expect */
    .then(r => this.reShapeResponse(r))
    .then(data => this.indexByKeyName(data, 'id'));
  }

  getTask(id) {
    return fetch(`${this.API_URL}/tasks/${id}`, {
      method:  'GET',
      headers: this.headerWithToken(),
    })
    .then(r => r.json())
    .then(r =>
      /* restructure the received data into the shape we expect */
      ({
        ...r.data.attributes,
        id: r.data.id,
      })
    );
  }

  createTask(newTask) {
    return fetch(`${this.API_URL}/tasks`, {
      method:  'POST',
      headers: this.headerWithToken(),
      body:    JSON.stringify(newTask),
    })
    .then(r => r.json());
  }

  toggleField(field, id) {
    return fetch(`${this.API_URL}/tasks/${id}/toggle`, {
      method:  'PATCH',
      headers: this.headerWithToken(),
      body:    JSON.stringify({ field }),
    });
  }

  deleteTask(id) {
    return fetch(`${this.API_URL}/tasks/${id}`, {
      method:  'DELETE',
      headers: this.headerWithToken(),
    })
    .then(r => r.json());
  }
}
