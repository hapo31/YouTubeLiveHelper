/* eslint-disable */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

const outputPath = path.resolve(__dirname, "dist");
const resolveExt = [".json", ".js", ".jsx", ".css", ".ts", ".tsx", ".svg"];

var index = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,
  entry: path.join(__dirname, "src", "index"),
  output: {
    filename: "script.js",
    path: path.resolve(outputPath),
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "ts-loader",
      },
      {
        test: /.svg$/,
        include: [path.resolve(__dirname, "img")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "react-svg-loader",
      }
    ],
  },
  resolve: {
    extensions: resolveExt
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "manifest.json"),
        }
      ],
    }),
  ],
  devServer: {
    contentBase: outputPath
  }
};

var popup = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,
  entry: path.join(__dirname, "src", "popup"),
  output: {
    filename: "popup.js",
    path: path.resolve(outputPath),
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "ts-loader",
      },
      {
        test: /.svg$/,
        include: [path.resolve(__dirname, "img")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "react-svg-loader",
      }
    ],
  },
  resolve: {
    extensions: resolveExt
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "popup.html"),
          to: path.resolve(__dirname, outputPath),
        }
      ],
    }),
  ],
  devServer: {
    contentBase: outputPath
  }
};

module.exports = [index, popup];
