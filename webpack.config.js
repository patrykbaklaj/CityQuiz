
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ["./js/app.jsx", './scss/style.scss'],
  output: {
    filename: "./js/out.js"
  },

  watch: true,

  module: {
    rules: [
      { // React
        test: /\.jsx$/, exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] }
      },
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: './css/style.css',
      allChunks: true,
    }),
  ],
}
