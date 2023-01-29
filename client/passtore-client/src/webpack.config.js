const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  resolve: {
    plugins: [
      new NodePolyfillPlugin()
    ],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      vm: require.resolve("vm-browserify")
    }
  }
};
