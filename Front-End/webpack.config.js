const path = require('path');

module.exports = {
  entry: './public/popup.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'popup.bundle.js'
  },
  devtool: 'source-map', // Use 'source-map' instead of 'eval-source-map'
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development'
};