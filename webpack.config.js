const path = require("path");
const webpack = require("webpack");

/** @type {import("@types/webpack").Configuration} */
module.exports = {
   mode: "development",
   entry: "./src/index",
   devtool: false,
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
   },
   module: {
      rules: [
         {
            test: /\.jsx?/,
            loader: "babel-loader",
            options: {
               presets: ["@babel/preset-env", "@babel/preset-react"]
            }
         }
      ]
   },
   resolve: {
      extensions: [".js", ".jsx"],
   },
   plugins: [new webpack.ProvidePlugin({ React: require.resolve("react") })]
}