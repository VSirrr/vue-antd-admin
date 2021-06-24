const msg = require('./msg');
const role = require('./role');
const user = require('./user');
const operator = require('./operator');
const operationApply = require('./operationApply');

const mocks = [...msg, ...role, ...user, ...operator, ...operationApply];

module.exports = {
  mocks,
};
