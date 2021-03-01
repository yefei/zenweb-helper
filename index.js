'use strict';

const { Helper } = require('./lib/helper');

/**
 * 安装 helper 服务
 * @param {import('@zenweb/core').Core} core
 */
function setup(core) {
  core.defineContextCacheProperty('helper', ctx => new Helper(ctx));
}

module.exports = {
  setup,
};
