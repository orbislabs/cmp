const path = require('path');

module.exports = {
    entry : './client/main.js',
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cmp.bundle.js'
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
        }]
    }
};