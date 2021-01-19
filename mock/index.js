const wr = require('./wr');
const msg = require('./msg');
const mark = require('./mark');
const user = require('./user');
const data = require('./data');
const files = require('./files');
const warning = require('./warning');
const operator = require('./operator');
const platform = require('./platform');
const provider = require('./provider');
const warehouse = require('./warehouse');
const operationApply = require('./operationApply');

const mocks = [
  ...wr,
  ...msg,
  ...mark,
  ...user,
  ...data,
  ...files,
  ...warning,
  ...operator,
  ...platform,
  ...provider,
  ...warehouse,
  ...operationApply,
];

module.exports = {
  mocks,
};
