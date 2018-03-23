var debug = require('debug')('app:pro-server')
var projectConfig = require('./project.config.js')

var config = require("./webpack.base.js");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var merge = require('webpack-merge')
var webpack = require('webpack');

debug('编译打包')

var _plugins = [
    new OptimizeCSSPlugin()
]

if(projectConfig.compiler_uglifyJs){
    _plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: projectConfig.compiler_source_map
        }))
}



module.exports =merge(config,{
    plugins:_plugins

})
debug('编译打包-end')
