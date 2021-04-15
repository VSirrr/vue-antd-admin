const path = require('path');
const webpack = require('webpack');
const compressionPlugin = require('compression-webpack-plugin');
const { NODE_ENV, ANALYZE } = process.env;

// 是否为生产环境
const isPro = NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: !isPro,
  productionSourceMap: !isPro,
  devServer: {
    open: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    before: require('./mock/mock-server.js'),
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // 修改默认变量的值
          modifyVars: {
            // 主题色
            // 'primary-color': '#1a2b54',
            // 圆角
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
        // 统一为 less 文件添加依赖
        prependData: '@import "~ant-design-vue/es/style/themes/default.less";',
      },
    },
  },
  configureWebpack: {
    name: 'vue-antd-admin',
    resolve: {
      alias: {
        components: resolve('src/components'),
        layouts: resolve('src/layouts'),
        mixins: resolve('src/mixins'),
        styles: resolve('src/styles'),
        assets: resolve('src/assets'),
        views: resolve('src/views'),
        utils: resolve('src/utils'),
        api: resolve('src/api'),
        '@': resolve('src'),
      },
    },
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // gzip files
      new compressionPlugin({
        test: /\.js$|\.css$|\.html$/,
        threshold: 1024 * 10,
        deleteOriginalAssets: false,
      }),
    ],
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ]);
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch');
    // 移除模板中的无用空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false;
        return options;
      });
    // bundle analyzer
    if (ANALYZE) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    config.when(isPro, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      // 将runtime代码直接打包之html中
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single');
      // split chunks
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          antd: {
            name: 'chunk-antd',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/,
          },
          common: {
            name: 'chunk-common',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
    });
  },
};
