import { SetupFunction } from '@zenweb/core';
import { Helper } from './helper';

/**
 * 安装 helper 服务
 */
export default function setup(): SetupFunction {
  return function helper(setup) {
    setup.checkContextProperty('fail', 'Need to setup @zenweb/api');
    setup.checkCoreProperty('messageCodeResolver', 'Need to setup @zenweb/messagecode');
    setup.defineContextCacheProperty('helper', ctx => new Helper(ctx));
    setup.core.messageCodeResolver.assign(require('../message-codes.json'));
  }
}

declare module 'koa' {
  interface DefaultContext {
    helper: Helper;
  }
}
