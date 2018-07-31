const path = require('path');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var models = require('./config/models')

module.exports = {
  entry: models.getEntry(),
  output: {
    path: __dirname + '/dist',
    // 打包多出口文件
    // 生成 a.bundle.js  b.bundle.js  jquery.bundle.js
    filename: './[name]/index.js',
  },
  externals: {
    "knockout": "ko",
    "jquery": "jQuery"
  },
  plugins: [
    new cleanWebpackPlugin(["dist"]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ].concat(models.getTemplate()),
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    host: "localhost",
    port: "3001",
    open: true, // 开启浏览器
    hot: true   // 开启热更新
  },
  devtool: "source-map",  // 开启调试模式
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]},
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // 不检查node_modules下的js文件
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          // 需要下载file-loader和url-loader
          loader: "url-loader",
          options: {
            limit: 50,
            // 图片文件输出的文件夹
            outputPath: "images"
          }
        }
        ]
      },
      {
        test: /\.html$|\.tpl$/,
        // html中的img标签
        use: ["html-withimg-loader"]
      },
      {
        test: /\.ejs$/,
        // html中的img标签
        use: "ejs-loader"
      }
    ]
  },
  resolve: {
    alias: {
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        ycloud: {
          test: /[\\/]node_modules[\\/]ycloud/,
          name: "ycloud",
          chunks: "all",
          priority: 10
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: 1
        },
        common: {
          name: 'common',
          minSize: 0,
          chunks: "all",
          priority: 0
        }
      }
    }
  }
}
