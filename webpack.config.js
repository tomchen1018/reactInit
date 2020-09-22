const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: ['@babel/polyfill', './src/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/react',
            {
              'plugins': ['@babel/plugin-proposal-class-properties']
            }]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader?name=[name].[ext]',
          },
        ],
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          name: "[path][name].[ext]",
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
          emitFile: true,
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
      inject: false,
    }),

    new Dotenv()
  ]
}