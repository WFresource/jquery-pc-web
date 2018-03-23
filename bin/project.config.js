/* 项目配置 */
var path = require('path');
var pkg = require('../package.json')
var debug = require('debug')('app:project.config');


debug('开始读取默认配置.%o',process.env.NODE_ENV)
// ========================================================
// 基础配置
// ========================================================
const config = {
    // ----------------------------------
    // 项目结构
    // ----------------------------------
    path_base: path.resolve(__dirname, '..'),
    dir_src: 'src',
    dir_dist: 'dist/'+pkg.version,

    // ----------------------------------
    // 服务器配置
    // ----------------------------------
    server_host: "localhost", // 使用字符串“localhost”,以防止暴露在本地网络
    server_port: 7000,
    server_stats:'errors-only',
        /*{
        colors:true,
        timings: true
        },*/
    // ----------------------------------
    // 代理地址
    // ----------------------------------
    /*server_proxy: {
        '/dsj': {
            target: 'http://160.6.70.252:3004',
            pathRewrite: {'^/dsj/' : '/dsj/'},
            changeOrigin: true
        }
    },*/
    server_proxy: [{
        context: ["/mock"],
        target: "http://www.doclever.cn:8090"
    }],


    // ----------------------------------
    // 编译结构
    // ----------------------------------

    compiler_source_map:true,   /*生产环境是否 map 映射取决参数*/
    compiler_devtool: 'cheap-module-source-map', /*'source-map'*/
    compiler_hash:'[hash:5]',
    compiler_publicPath:process.env.NODE_ENV == 'development' ? '/':'/dsj/dev/',
    compiler_uglifyJs:false, // 生产环境下 js 是否压缩

    globals:{
        __DEV__: process.env.NODE_ENV == 'development' ? true:false
    }

};


// ------------------------------------
// 实用工具
// ------------------------------------
function base() {
    const args = [config.path_base].concat([].slice.call(arguments))
    return path.resolve.apply(path, args)
}

config.paths = {
    base: base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist)
};


module.exports = config;
