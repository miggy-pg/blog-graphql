const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  mode: "development",
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
    ],
  },
  resolve: { extensions: ["*", ".js"] },
  output: {
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "/"),
    port: 3000,
    devMiddleware: {
      publicPath: "/dist/",
      writeToDisk: true,
    },
    hot: "only",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html",
    }),
  ],
};
