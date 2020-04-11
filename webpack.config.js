const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:'./src/js/main.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'main.js'
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader'],
        },
        {
            test:/\.(eot|woff|woff2|svg|ttf)/,
            use:'url-loader',
        }]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ]
}