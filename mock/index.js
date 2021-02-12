const msg = require('./msg');
const user = require('./user');
const operator = require('./operator');
const operationApply = require('./operationApply');

const mocks = [...msg, ...user, ...operator, ...operationApply];

module.exports = {
  mocks,
};
