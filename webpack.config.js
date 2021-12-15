const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log('IS DEV:', isDev);

const filenames = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    entry: './assets/js/index.js',
    output: {
        filename: filenames('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'assets/img'), to: path.resolve(__dirname, 'dist/img')},
                {from: path.resolve(__dirname, 'assets/svg'), to: path.resolve(__dirname, 'dist/svg')},
                {from: path.resolve(__dirname, 'assets/sounds'), to: path.resolve(__dirname, 'dist/sounds')},
                {from: path.resolve(__dirname, 'assets/fonts'), to: path.resolve(__dirname, 'dist/fonts')},
                {from: path.resolve(__dirname, 'assets/json'), to: path.resolve(__dirname, 'dist/json')}
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filenames('css')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    }
}
