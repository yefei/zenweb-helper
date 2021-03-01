'use strict';

const { typeCastPick } = require('typecasts');

class Helper {
  /**
   * @param {import('koa').Context} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * query('keyword', { limit: Number, offset: 'number', is: Boolean })
   * @param  {...any} fields 
   */
  query(...fields) {
    return typeCastPick(this.ctx.query, fields);
  }

  body(...fields) {
    return typeCastPick(this.ctx.request.body, fields);
  }

  params(...fields) {
    return typeCastPick(this.ctx.params, fields);
  }
}

module.exports = Helper;
