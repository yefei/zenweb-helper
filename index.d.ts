import 'koa';

type typeCastPickFields = (string | { [key: string]: string | ((value: any, defaultValue: any) => any) })[];

declare interface Helper {
  query(...fields: typeCastPickFields): { [key: string]: any };
  body(...fields: typeCastPickFields): { [key: string]: any };
  params(...fields: typeCastPickFields): { [key: string]: any };
}

declare module 'koa' {
  interface BaseContext {
    helper: Helper;
  }
}
