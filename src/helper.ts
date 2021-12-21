import '@zenweb/api';
import '@zenweb/body';
import '@zenweb/messagecode';

import * as Koa from 'koa';
import { ValidateError, RequiredError, castFields, typeCastPick } from 'typecasts';

export class Helper {
  ctx: Koa.Context;

  constructor(ctx: Koa.Context) {
    this.ctx = ctx;
  }

  typeCastPick(data: { [key: string]: any }, fields: castFields[]) {
    try {
      return typeCastPick(data, fields);
    } catch (e) {
      if (e instanceof RequiredError) {
        this.ctx.fail(this.ctx.messageCodeResolver.format(`helper.required-error.${e.field}`, e));
      }
      else if (e instanceof ValidateError) {
        let code = e.validate;
        if (e.validate === 'cast') code += `.${typeof e.target === 'function' ? e.target.name || '-' : e.target}`;
        this.ctx.fail(this.ctx.messageCodeResolver.format(`helper.validate-error.${code}.${e.field}`, e));
      }
      throw e;
    }
  }

  query(...fields: castFields[]) {
    return this.typeCastPick(this.ctx.query, fields);
  }

  body(...fields: castFields[]) {
    return this.typeCastPick(this.ctx.request.body, fields);
  }

  params(...fields: castFields[]) {
    return this.typeCastPick(this.ctx.params, fields);
  }
}
