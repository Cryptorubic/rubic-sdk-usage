# Rubic SDK usage

## Setup

1. `yarn eject`
2. `yarn add -D http-browserify https-browserify stream-browserify crypto-browserify`
3. modify config/webpack.config.js
   1. add to `plugins`
      ```javascript
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
      ```
   2. add `resolve.fallback`
      ```
      fallback: {
        "fs": false,
        "constants": false,
        "querystring": false,
        "url": false,
        "path": false,
        "os": false,
        "http": require.resolve("http-browserify"),
        "https": require.resolve("https-browserify"),
        "zlib": false,
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify")
      },
      ```
