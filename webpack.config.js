const path = require("path");

/** @type {import("@types/webpack").Configuration} */
module.exports = {
   mode: "development",
   entry: "./src/index.jsx",
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
   }
}