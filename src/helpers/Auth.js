/* global localStorage:false */
// source: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
export default class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   */
  static getToken() {
    return localStorage.getItem('token');
  }

}

