const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');// remove from package


const config = {
    entry : {
        cmp : './client/main.js',
        ui : './client/ui/ui.js'
    },
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
            }
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
                }, {
                loader: 'css-loader'
                }]
        },
        {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader'
            }
        }]
    }
};

module.exports = config;