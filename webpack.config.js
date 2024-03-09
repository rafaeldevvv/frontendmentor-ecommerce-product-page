const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

/** @type {import("@types/webpack").Configuration} */
module.exports = {
   mode: devMode ? "development" : "production",
   entry: "./src/index",
   devtool: false,
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.jsx?/,
            loader: "babel-loader",
            options: {
               presets: ["@babel/preset-env", "@babel/preset-react"]
            }
         },
         {
            test: /\.css/,
            use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
         }
      ]
   },
   resolve: {
      extensions: [".js", ".jsx"],
   },
   plugins: [new webpack.ProvidePlugin({ React: require.resolve("react") })].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
}