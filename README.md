# ZenWeb Helper module

[ZenWeb](https://www.npmjs.com/package/zenweb)

### ctx.helper
#### query(), body(), params()
```js
ctx.body = ctx.helper.query('kw', {
  count: 'int',
  is: 'bool',
  list:'int[]',
  trim:'trim',
  trimList:'trim[]',
});
```
```bash
curl --location --request GET '127.0.0.1:7001/typecast?kw=%20111%20&count=222&is=y&list=1,2,3&trim=%20%20aaaa%20&trimList=asd,sdd,%20%20ddd%20,d,,1'
```
```json
{
  "kw": " 111 ",
  "count": 222,
  "is": true,
  "list": [
    1,
    2,
    3
  ],
  "trim": "aaaa",
  "trimList": [
    "asd",
    "sdd",
    "ddd",
    "d",
    "1"
  ]
}
```
