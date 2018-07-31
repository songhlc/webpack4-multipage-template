const path = require('path');
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
// 注册额外的模块
var uuiversion = "iuap-design-3.1.23"
var uuipath = "/js/uui/" + uuiversion
var models = {
  'pages/pageA': '页面A',
  'pages/pageB': '页面B'
}
var pre = '';
var innerscript = {
  js:[
    "https://cdn.bootcss.com/knockout/3.4.2/knockout-min.js",
    "https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js"
  ],
  css:[
    "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
  ]
}
function getEntry (){
  var entry = {}
  var srcUrl = path.resolve(__dirname, '../src')
  Object.keys(models).map(function (key) {
    entry[key] = srcUrl + '/' + key + '/index.js'
  })
  return entry
}
function getTemplate (){
  var htmlPlugins = []
  var srcUrl = path.resolve(__dirname, '../src')
  Object.keys(models).map(function (key) {
    var html = new htmlWebpackPlugin({
      title: models[key].title ? models[key].title : models[key],
      //生成模板地址
      template: srcUrl +"/"+ key + '/index.ejs',
      filename: './'+key+'/index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: [key, 'vendor', 'ycloud', 'common'],
      //要把script插入到标签里
      inject: 'body',
      "files": {
        "css": innerscript.css,
        "js": innerscript.js
      }
    })
    htmlPlugins.push(html)
  })

  return htmlPlugins
}
module.exports = {
  getEntry: getEntry,
  getTemplate: getTemplate
}
