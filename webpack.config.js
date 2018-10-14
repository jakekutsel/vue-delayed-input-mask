const webpack = require('webpack');
const path = require('path');
const {name} = require('./package.json');

let config = {
    entry: {
        [name]: path.resolve(__dirname + '/src/vue-delayed-input-mask.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].min.js',
        library: "VueDelayedPasswordMask",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }
        ]
    },
    externals: {
        "vue": "vue"
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.min\.js$/,
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = [
    config
];
