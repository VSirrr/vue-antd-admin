const msg = require('./msg');
const user = require('./user');
const data = require('./data');
const operator = require('./operator');
const warehouse = require('./warehouse');

const mocks = [...operator, ...data, ...msg, ...user, ...warehouse];

module.exports = {
  mocks,
};
