/* global fetch:false */
/* global Headers:false */
import Auth from './Auth';

export default class AjaxAdapter {
  static clearToken() {
    Auth.deauthenticateUser();
  }

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
    this.formatResponse = function (r) {
      return r.data.map ?
        /* if our data is a collection */
        r.data.map(task => ({
          ...task.attributes,
          id: +task.id,
        }))
      :
        /* If our data is single */
        {
          ...r.data.attributes,
          id: +r.data.id,
        };
    };

    // custom function to convert an array into a obj literal
    // indexed by keys of our choosing
    this.indexByKeyName = (arr, keyName) =>
      arr.reduce((obj, el) => ({ ...obj, [el[keyName]]: el }), {});
  }


  /* basic GET with a token */
  getAuthURL(url) {
    return fetch(url, {
      headers: this.headerWithToken(),
      method:  'GET',
    })
    .then(r => !r.status.ok && Promise.reject(r));
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
    return this.getAuthURL(`${this.API_URL}/tasks`)
    .then(r => r.json())
    /* restructure the received data into the shape we expect */
    .then(this.formatResponse)
    .then(data => this.indexByKeyName(data, 'id'));
  }

  getTask(id) {
    return this.getAuthURL(`${this.API_URL}/tasks/${id}`)
    .then(r => r.json())
    /* restructure the received data into the shape we expect */
    .then(this.formatResponse)
    .then(data => this.indexByKeyName(data, 'id'));
  }

  createTask(newTask) {
    // The server is expecting {name, description}
    const taskFormatted = {
      name:        newTask.name,
      description: newTask.desc,
    };

    return fetch(`${this.API_URL}/tasks`, {
      method:  'POST',
      headers: this.headerWithToken(),
      body:    JSON.stringify(taskFormatted),
    })

    /* make another fetch to grab the newly created task */
    /* We'll be returning the fetch, so the other thens will work */
    .then(r => this.getAuthURL(r.headers.get('Location')))
    .then(r => r.json())
    .then(this.formatResponse);
  }

  toggleField(field, id) {
    return fetch(`${this.API_URL}/tasks/${id}/toggle`, {
      method:  'PATCH',
      headers: this.headerWithToken(),
      body:    JSON.stringify({ field }),
    })
    .then(r => {
      debugger
      this.getAuthURL(r.headers.get('Location'))
    })
    .then(r => r.json())
    .then(this.formatResponse)
    .then(data => {
      debugger
      this.indexByKeyName(data, 'id')
    });
  }

  deleteTask(id) {
    return fetch(`${this.API_URL}/tasks/${id}`, {
      method:  'DELETE',
      headers: this.headerWithToken(),
    })
    .then(r => this.getAuthURL(r.headers.get('Location')))
    .then(r => r.json())
    .then(this.formatResponse)
    .then(data => this.indexByKeyName(data, 'id'));
  }
}
