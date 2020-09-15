const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/main.js',
        mode: 'production',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
                }
            ],
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        plugins: [new copyWebpackPlugin([{ from: 'demo/' }])]
    }];
};