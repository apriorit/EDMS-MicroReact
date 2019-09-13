var path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    inline: true,
    port: 5002,
    host: "localhost",
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true
  }
};
