const webpack = require('webpack');
const resolve = require('path').resolve;
const src = resolve(__dirname, 'src');
const dist = resolve(__dirname, 'dist');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    app: './src/entry.js'
  },

  output: {
    path: dist,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [src],
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader?configFile=.eslintrc',
        include: [src],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        },
        include: [src],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]&emitFile=false'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    stats: 'errors-only',
    publicPath: '/dist/',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        mode: 'production'
      }
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:3000/' })
  ]
};
