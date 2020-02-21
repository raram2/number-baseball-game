const path = require('path'); // node_modules에 있는 경로 제어 모듈
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// process.env.NODE_ENV = 'production'; // 배포시 Node.js 환경변수 변경

module.exports = {
  name: 'number-baseball-game-dev',
  mode: 'development', // 배포시 production
  devtool: 'eval', // 배포시 hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: {
    app: ['./src/client'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules'),
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR'],
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel'],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({debug: true}), new UglifyJSPlugin()],
  output: {
    path: path.join(__dirname, 'dist'), // Asset route for local
    filename: 'app.js',
    publicPath: '/dist/', // Asset route for server
  },
};
