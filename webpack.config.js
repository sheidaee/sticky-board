const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

module.exports = {
    entry: {
        app: [
            'react-dev-utils/webpackHotDevClient',
            './src/app.js',
        ],
    },
    /* devtool: 'source-map', */
    output: {
        path: path.resolve(`${__dirname}/dist`),
        /* publicPath: '/assets/', */
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /src\/app/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    }, 'sass-loader',
                ],
                }),
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                /* query: {
                    presets: ['env'],
                }, */
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]',
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            },
        ],
    },
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        stats: 'errors-only',
        open: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sticky Notes',
            /* minify: {
                collapseWhitespace: true
            }, */
            template: './src/index.html', // Load a custom template
            hash: true,
        }),
        new ExtractTextPlugin('styles.css'),
    ],
};
