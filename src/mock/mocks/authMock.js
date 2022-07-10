// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
  auth: [ // key的名字不要取重了
    API.AUTH,
    "get",
    { "code": "00000", "msg": "Success", "result": { "name": "Yuki", "role": "ADMIN", "password": null } }
  ],
  login: [
    API.LOGIN,
    "post",
    { "code": "00000", "msg": "Success", "result": { "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJuYW1lIjoic2t5IiwiZXhwIjoxNjU3MzcwMjA3LCJpYXQiOjE2NTcyODM4MDd9.xBq3u0vpp3i3-U86qq8MHGHvvZ3xO5fa3LDqM2gIWWE" } }
  ]
};
