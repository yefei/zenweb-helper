'use strict';

const app = require('../../app');

app.router.get('/', ctx => {
  const data = ctx.helper.query('kw', {
    age: {
      type: 'int',
      validate: {
        gt: 10,
      }
    },
    req: {
      type: 'bool',
      required: true,
    }
  });
  ctx.success(data);
});
