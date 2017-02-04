const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, './'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {presets: ['es2015']},
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                })
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({filename: 'bundle.css', disable: false, allChunks: true})
    ]
};