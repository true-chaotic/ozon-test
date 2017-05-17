var ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
    entry : './src/app.js',
    output: {
        path: __dirname,
        filename: 'app.dist.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
           test: /\.css$/,
           loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
        }, {
            test: /\.(png)$/,
            loader: "file-loader?name=assets/[name]-[hash:6].[ext]"
        }]
    },
    plugins: [
        new ExtractTextPlugin('app.dist.css')
    ]
};
