/* global fetch:false */
/* global Headers:false */
import Auth from './Auth';
import ArrayExtensions from './ArrayExtensions';

export default class AjaxAdapter {
  clearToken() {
    Auth.deauthenticateUser();
  }

  formatResponse(r) {
    const promoteIDfield = task => ({
      ...task.attributes,
      id: +task.id,
    });


    /* if our data is a collection map over each,
      otherwise run the formatter on the one piece of data */
    const data = r.data.map ? r.data.map(promoteIDfield) : promoteIDfield(r.data);
    return data;
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
  }

  /* basic GET with a token */
  getAuthURL(url) {
    return fetch(url, {
      headers: this.headerWithToken(),
      method:  'GET',
    })
    .then(response => (!response.ok ? Promise.reject(response) : response));
  }

  /* LOGIN does not require a token; we receive one */
  login(user) {
    return fetch(`/auth_user`, {
      headers: this.jsonHeader,
      method:  'POST',
      body:    JSON.stringify(user),
    })
    .then(r => r.json())
    .then(r => Auth.authenticateUser(r.auth_token));
  }

  getTasks() {
    return this.getAuthURL('/tasks')
    .then(r => r.json())
    /* restructure the received data into the shape we expect */
    .then(this.formatResponse)
    .then(data => ArrayExtensions.indexByKeyName(data, 'id'));
  }

  getTask(id) {
    return this.getAuthURL(`/tasks/${id}`)
    .then(r => r.json())
    /* restructure the received data into the shape we expect */
    .then(this.formatResponse)
    .then(data => ArrayExtensions.indexByKeyName(data, 'id'));
  }

  createTask(newTask) {
    // The server is expecting {name, description}
    const taskFormatted = {
      name:        newTask.name,
      description: newTask.desc,
    };

    return fetch(`/tasks`, {
      method:  'POST',
      headers: this.headerWithToken(),
      body:    JSON.stringify(taskFormatted),
    })
    .then(response => (!response.ok ? Promise.reject(response) : response))

    /* make another fetch to grab the newly created task */
    /* We'll be returning the fetch, so the other thens will work */
    .then(r => this.getAuthURL(r.headers.get('Location')))
    .then(r => r.json())
    .then(this.formatResponse);
  }

  toggleField(field, id) {
    debugger;
    return fetch(`/tasks/${id}/toggle`, {
      method:  'PATCH',
      headers: this.headerWithToken(),
      body:    JSON.stringify({ field }),
    })
    .then(r => this.getAuthURL(r.headers.get('Location')))
    .then(r => r.json())
    .then(this.formatResponse);
  }

  deleteTask(id) {
    return fetch(`/tasks/${id}`, {
      method:  'DELETE',
      headers: this.headerWithToken(),
    })
    .then(response => (!response.ok ? Promise.reject(response) : response));
  }
}
