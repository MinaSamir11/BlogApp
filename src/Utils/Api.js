const axios = require('axios');

class Api {
  static create(baseURL) {
    return axios.create({
      baseURL: baseURL,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        dataType: 'json',
      },
    });
  }

  static get(baseURL, ...args) {
    let server = this.create(baseURL);

    return server.get(...args);
  }

  static put(baseURL, ...args) {
    let server = this.create(baseURL);

    return server.put(...args);
  }

  static post(baseURL, ...args) {
    let server = this.create(baseURL);

    return server.post(...args);
  }

  static delete(baseURL, ...args) {
    let server = this.create(baseURL);

    return server.delete(...args);
  }
}

export default Api;
