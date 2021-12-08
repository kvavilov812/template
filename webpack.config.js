//const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        // path: path.resolve(__dirname, './dist'),
        filename: 'js/index.js',
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
        ],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'dist/index.html' }),
        new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    ],
};
