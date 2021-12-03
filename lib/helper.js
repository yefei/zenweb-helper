'use strict';

const typecasts = require('typecasts');

class Helper {
  /**
   * @param {import('koa').Context} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
  }

  typeCastPick(data, fields) {
    const core = this.ctx.core;
    try {
      return typecasts.typeCastPick(data, fields);
    } catch (e) {
      if (e instanceof typecasts.RequiredError) {
        this.ctx.fail(core.messageCodeResolver.format(`helper.required-error.${e.field}`, e));
      }
      else if (e instanceof typecasts.ValidateError) {
        let code = e.validate;
        if (e.validate === 'cast') code += `.${typeof e.target === 'function' ? e.target.name || '-' : e.target}`;
        this.ctx.fail(core.messageCodeResolver.format(`helper.validate-error.${code}.${e.field}`, e));
      }
      throw e;
    }
  }

  /**
   * query('keyword', { limit: Number, offset: 'number', is: Boolean })
   * @param  {...any} fields 
   */
  query(...fields) {
    return this.typeCastPick(this.ctx.query, fields);
  }

  body(...fields) {
    return this.typeCastPick(this.ctx.request.body, fields);
  }

  params(...fields) {
    return this.typeCastPick(this.ctx.params, fields);
  }
}

module.exports = Helper;
