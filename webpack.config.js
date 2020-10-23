const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const StaticFilesWebpackPlugin = require('static-files-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        "index.js": ['@babel/polyfill', path.resolve(__dirname, "src")]
    },
    output: {
        path: path.resolve(__dirname, "build/static"),
        filename: "[name]",
        publicPath: isProduction ? './' : '/',
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        compress: true,
        publicPath: '/',
        contentBase: './src',
    },
    plugins: isProduction 
        ? [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src/index.html")
            }),
            new MiniCssExtractPlugin({
                filename: 'main.css'
            })
        ] 
        : [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src/index.html")
            })
        ],
    resolve: {
        extensions: [".js", ".json", ".mjs"],
        alias: {
            components: path.resolve(__dirname, "src/components"),
            api: path.resolve(__dirname, "src/api"),
            static: path.resolve(__dirname, "src/static"),
            pages: path.resolve(__dirname, "src/pages"),
        }
    },
    module: {
        rules: [
            {
                test:  /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test:  /\.(ttf|png|jpg)$/,
                loader: 'url-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10000,
                    },
                }],
            }
        ]
    }
};
