var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: './entry.js',
    output: {
        filename: 'build.js'
    },
    module:{
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel',query: {presets: ['es2015'], cacheDirectory: false}},
            { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    },
    plugins:[
    	new ExtractTextPlugin("styles.css")
    ]


};