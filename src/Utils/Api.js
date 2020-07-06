const axios = require('axios');

class Api {
  static create() {
    return axios.create({
      baseURL: 'http://192.168.1.3',
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        dataType: 'json',
      },
    });
  }

  static get(...args) {
    let server = this.create();

    return server.get(...args);
  }

  static put(...args) {
    let server = this.create();

    return server.put(...args);
  }

  static post(...args) {
    let server = this.create();

    return server.post(...args);
  }

  static delete(...args) {
    let server = this.create();

    return server.delete(...args);
  }
}

export default Api;
