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
                exclude: /node_modules/,
                enforce: 'pre',
                use: [{loader: 'eslint-loader', options: {rules: {semi: 0}}}],
            },
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
            },
            {
                test: /\.(jpe?g|png)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({filename: 'bundle.css', disable: false, allChunks: true})
    ]
};