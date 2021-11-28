const path = require("path")
HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/OTP.html',
            inject: true,
            chunks: ['index'],
            filename: 'OTP.html'
        }),
        new HtmlWebpackPlugin({
            template: './dist/login.html',
            inject: true,
            chunks: ['login'],
            filename: 'login.html'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}