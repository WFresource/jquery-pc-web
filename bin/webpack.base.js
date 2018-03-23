var debug = require('debug')('app:webpack.base')
var projectConfig = require('./project.config.js')

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack');

debug('合并基础配置.%o',process.env.NODE_ENV);


module.exports = {
    devtool:projectConfig.compiler_devtool,
    resolve:{
        alias:{
            //文件
            config:projectConfig.paths.src('config.js'),
            utility:projectConfig.paths.src('vendor/js/utility/utility.js'),
            underscore:projectConfig.paths.src('vendor/js/utility/underscore/underscore.min.js'),
            director:projectConfig.paths.src('vendor/js/utility/director/director.js'),

            //路劲
            assets: projectConfig.paths.src('assets'),
            vendor: projectConfig.paths.src('vendor')

        }
    },
    entry: {
        app:projectConfig.paths.src('app.js'),
        login:projectConfig.paths.src('login.js'),
        common:[
            'babel-polyfill',
            'jquery',
            'bootstrap',
            'lodash',
            'director',
            'config',
            'utility'

        ]
    },
    output: {
        path: projectConfig.paths.dist(),
        publicPath:projectConfig.compiler_publicPath,
        filename: 'js/[name]-'+ projectConfig.compiler_hash +'.js',
        chunkFilename:'js/[name]-'+ projectConfig.compiler_hash +'.js'
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                exclude: [
                    projectConfig.paths.src('index.html'),
                    projectConfig.paths.src('login.html'),

                ],
                use:[
                    {
                        loader: "file-loader",
                        options: {
                            name: 'routes/[name]-'+ projectConfig.compiler_hash +'.[ext]',
                        }
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                            interpolate: true
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader','less-loader'],
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '1024',
                            name:'assets/img/[name]-'+ projectConfig.compiler_hash +'.[ext]'
                        }
                    },
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            prefix:'font',
                            name:'assets/fonts/[name]-'+ projectConfig.compiler_hash +'.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(projectConfig.globals),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            "_": "lodash",
            "director":"director",
            "_DSJ_CONFIG_":"config"

        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:['common'],
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template:  projectConfig.paths.src('index.html'),
            hash: false,
            inject: true,
            chunks: ['common','app'],
            minify: { //压缩HTML文件
            	removeComments: true, //移除HTML中的注释
            	collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({
            filename: './login.html',
            template:  projectConfig.paths.src('login.html'),
            hash: false,
            inject: true,
            chunks: ['common','login'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new ExtractTextPlugin({
            filename:'css/[name]-'+ projectConfig.compiler_hash +'.css',
            allChunks:true
        }),
        new CopyWebpackPlugin([
            {
                from: projectConfig.paths.src('static'),
                to: process.env.NODE_ENV == 'development' ? projectConfig.paths.src('static'):projectConfig.paths.dist('static'),
            },
        ])
    ]

}