import { Core } from "@zenweb/core";
import { Helper } from "./helper";

/**
 * 安装 helper 服务
 */
export function setup(core: Core) {
  core.check('@zenweb/api');
  core.check('@zenweb/messagecode');
  core.defineContextCacheProperty('helper', ctx => new Helper(ctx));
}

declare module 'koa' {
  interface DefaultContext {
    helper: Helper;
  }
}
