'use strict';

const Helper = require('./lib/helper');
const Grid = require('./lib/grid');

/**
 * 安装 helper 服务
 * @param {import('@zenweb/core').Core} core
 */
function setup(core) {
  core.check('@zenweb/api');
  core.check('@zenweb/messagecode');
  core.defineContextCacheProperty('helper', ctx => new Helper(ctx));
}

module.exports = {
  setup,
  Grid,
};
