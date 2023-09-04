//webpack bundles all our javascript into one bundle and serves that
//wheres our entry and where should we output it
//entry is in src directory index js
//output is our directory > static front end folder
//file name being outputted is name.js
//excludes bundling node module folder
//minimize gets rid of unecessary info, ie white spaces


const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};