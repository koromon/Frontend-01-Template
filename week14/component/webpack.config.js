module.exports = {
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "create",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.view/,
        use: {
          loader: require.resolve("./myloader.js"),
        },
      },
      {
        test: /\.css$/,
        use: {
          loader: require.resolve("./cssloader.js"),
          // loader: "css-loader",
        },
      },
    ],
  },
  mode: "development",
  optimization: {
    minimize: false,
  },
};
