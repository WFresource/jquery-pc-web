var debug = require('debug')('app:dev-server')
var projectConfig = require('./project.config.js')

var config = require("./webpack.base.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// config.entry.app.unshift("webpack-dev-server/client?http://localhost:3000/");

debug("启动")


var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    // inline: true,
    // hot: true,
    contentBase:projectConfig.paths.src(),
    publicPath: "/",
    compress: false,
    port:projectConfig.server_port,
    stats: projectConfig.server_stats,
    proxy:projectConfig.server_proxy
});
// console.log(server)
server.listen(projectConfig.server_port,projectConfig.server_host,function () {
    debug('Starting server on http://'+ projectConfig.server_host +':'+projectConfig.server_port);
});