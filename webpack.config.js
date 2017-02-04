const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: ['webpack-dev-server/client', './main.js'],
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
                loader: 'image-webpack-loader?bypassOnDebug',
                options: {
                    mozjpeg: {
                        progressive: false,
                    },
                    gifsicle: {
                        interlaced: true,
                        optimizationLevel: 4
                    },
                    optipng: {
                        optimizationLevel: 7,
                        interlaced: true
                    },
                    pngquant: {
                        quality: '75-90',
                        speed: 1,
                    }
                }
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({filename: 'bundle.css', disable: false, allChunks: true})
    ]
};