/* eslint-disable */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

const outputPath = path.resolve(__dirname, isDev ? "dist" : "build");
const resolveExt = [".json", ".js", ".jsx", ".css", ".ts", ".tsx", ".svg"];

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
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: resolveExt,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "popup.html"),
          to: path.resolve(__dirname, outputPath),
        },
        {
          from: path.resolve(__dirname, "manifest.json"),
        },
        {
          from: path.resolve(__dirname, "icons", "48.png"),
        },
        {
          from: path.resolve(__dirname, "icons", "16.png"),
        },
      ],
    }),
  ],
  devServer: {
    contentBase: outputPath,
  },
};

var oauth_handler = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,
  entry: path.join(__dirname, "src", "oauth_handler"),
  output: {
    filename: "oauth_handler.js",
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
    ],
  },
  resolve: {
    extensions: resolveExt,
  },
  plugins: [],
};

var event_page = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,
  entry: path.join(__dirname, "src", "event_page"),
  output: {
    filename: "event_page.js",
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
    ],
  },
  resolve: {
    extensions: resolveExt,
  },
  plugins: [],
};

module.exports = [popup, oauth_handler, event_page];
