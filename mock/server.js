const path = require('path');
const bodyParser = require('body-parser');
const chokidar = require('chokidar');
const chalk = require('chalk');
const Mock = require('mockjs');
const fg = require('fast-glob');

const mockDir = path.join(process.cwd(), 'mock');

function registerRoutes(app) {
  let mockLastIndex;
  const mocks = [];

  const filesPath = fg.sync(`${mockDir}/api/*.js`, {
    // The current working directory in which to search. Defaults to process.cwd().
    // 修改搜索路径
    cwd: __dirname,
  });

  // 根据路径获取文件导出的数组，并合并到 mocks
  filesPath.forEach(path => {
    const file = require(path);
    mocks.push(...file);
  });

  const mocksForServer = mocks.map(({ url, type = 'get', response }) => {
    return responseFake(url, type, response);
  });

  for (const { type, url, response } of mocksForServer) {
    app[type](url, response);
    mockLastIndex = app._router.stack.length;
  }

  const mockRoutesLength = Object.keys(mocksForServer).length;

  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

// for mock server
function responseFake(url, type, respond) {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_URL}${url}`),
    type,
    response(req, res) {
      console.log('request invoke:' + req.path);
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond),
      );
    },
  };
}

module.exports = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  let { mockRoutesLength, mockStartIndex } = registerRoutes(app);

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          ({ mockRoutesLength, mockStartIndex } = registerRoutes(app));

          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`,
            ),
          );
        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });
};
