const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development', //production|development

    entry: './src/index.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, "dist")
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset", //resource|inline|!
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'img/[hash][ext][query]'
                },
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'font/[hash][ext][query]'
                },
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },

            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: false,
                },
            },
        ],
    },

    plugins:
        [
            new CleanWebpackPlugin(),

            new MiniCssExtractPlugin(),

            new HtmlWebpackPlugin(
                {
                    filename: 'index.html',
                    template: './src/html/index.html',
                    scriptLoading: 'blocking', //module|defer|blocking
                    inject: 'body', //head|body|false
                    minify: false,
                }
            ),
        ],

    devtool: false, //false|'source-map'

    devServer: {
        static: {
            directory: path.join(__dirname, 'src/html'),
        },
    },

    performance: {
        hints: false,
    },

    resolve: {
        extensions: ['.js'],
    }
}