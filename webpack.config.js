const path                  = require('path')
const webpack               = require('webpack')
const dev                   = process.env.NODE_ENV === "dev"
const ExtractTextPlugin     = require("extract-text-webpack-plugin")
const UglifyJSPlugin        = require('uglifyjs-webpack-plugin')

let cssLoaders = [
    { 
        loader: 'css-loader',
        options: { 
            importLoaders: 1,
            minimize: !dev
        }
    }
]
if(!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')()
            ]
        }
    })
}

let config = {
    entry: [
        './src/index'
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: dev ? 'cheap-module-eval-source-map' : false,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 8080
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ['eslint-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        ...cssLoaders,
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: dev
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

if(!dev) {
    config.plugins.push(new UglifyJSPlugin())
}

module.exports = config
