const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/index.js',
        clean: true,
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
        // minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'dist/index.html' }),
        new MiniCssExtractPlugin({ filename: 'css/style.css' }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/images',
                    to: 'images',
                    noErrorOnMissing: true,
                    force: true,
                },
                {
                    from: 'src/fonts',
                    to: 'fonts',
                    noErrorOnMissing: true,
                    force: true,
                },
            ],
            options: {},
        }),
    ],
};
