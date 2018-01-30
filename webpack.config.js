const webpack = require('webpack');
const compressionPlugin = require('compression-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const modulePath = __dirname + '/node_modules/';
module.exports = {
    entry: {
        app : './src/app.jsx'
    },
    output: {
        publicPath: '/static/',
        path: __dirname + '/dist/static',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: modulePath,
                loader: [{
                    loader: 'babel?presets=es2015'
                }
                ]
            }, {
                test: /\.jsx$/,
                exclude: modulePath,
                loader: [{
                    loader: 'jsx-loader'
                }, {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
                ]
            }, {
                test: /\.css$/,
                exclude: modulePath,
                loader: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }
                ]
            }, {
                test: /\.(png|jpg|jpeg)$/,
                exclude: modulePath,
                loader: [{
                    loader: 'url-loader',
                    query: {
                        limit: 8192,
                        name: 'images/[hash:8].[name].[ext]'
                    }
                }
                ]
            }, {
                test: /\.less$/,
                exclude: modulePath,
                loader: extractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: modulePath,
                loader: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new extractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            compress: {
                join_vars: true,
                warnings: false,
            },
            output: {
                comments: false,
            },
            except: ['$super', '$', 'exports', 'require'],
            toplevel: false,
            ie8: false,
        }),new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            compress: {
                join_vars: true,
                warnings: false,
            },
            output: {
                comments: false,
            },
            except: ['$super', '$', 'exports', 'require'],
            toplevel: false,
            ie8: false,
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};