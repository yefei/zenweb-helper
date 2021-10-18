import 'koa';

import { castFields } from 'typecasts';

declare interface Helper {
  query(...fields: castFields[]): { [as: string]: any };
  body(...fields: castFields[]): { [as: string]: any };
  params(...fields: castFields[]): { [as: string]: any };
}

declare module 'koa' {
  interface BaseContext {
    helper: Helper;
  }
}
