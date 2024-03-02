const path = require("path");

/** @type {import("@types/webpack").Configuration} */
module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, "dist"),
      name: "bundle.js"
   },
   module: {
      rules: [

      ]
   }
}