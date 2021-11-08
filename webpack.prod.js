const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "appContainer",
      library: { type: "var", name: "appContainer" },
      remotes: {
        navbar: "navbar",
        header: "header",
        groups: "groups",
        users: "users",
        visualization: "uservisualizations",
      },
      shared: {
        ...deps,
        react: { singleton: true },
        uuid: { singleton: true },
        "react-dom": {
          singleton: true,
        },
        "@mui/material": {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  performance: { hints: false },
};
