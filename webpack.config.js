var path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: './index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader')
      },
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  stats: {
    colors: true
  }
};
