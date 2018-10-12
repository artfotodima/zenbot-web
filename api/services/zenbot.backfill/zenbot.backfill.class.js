/* eslint-disable no-unused-vars,class-methods-use-this */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const logger = require('tracer').colorConsole(
      {
        format: '{{message}}\n at {{method}} ({{path}}:{{line}})',
        dateformat: 'HH:MM:ss.L'
      }
    );
    return require('./zenbot.backfill.exchanges');
  }

  async get(id, params) {
    // eslint-disable-next-line import/no-dynamic-require
    const products = require(`zenbot/extensions/exchanges/${id}/products.json`);
    if (products) {
      return products;
    }
    throw Error('Not supported exchange');
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
