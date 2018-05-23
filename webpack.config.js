const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
    entry : {
        cmp : './client/main.js',
        demo : './demo/demo.js'
    },
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {   test: /\.vue$/,
                loader: 'vue-loader'
            },
            {   test: /\.js$/,
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
                        loader: 'css-loader',
                        options : {modules : true}
                        }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }]
    },
    plugins : [
        new VueLoaderPlugin()
    ]
};

module.exports = config;