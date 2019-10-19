const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry:"./src/main.js",
    output:{
        path:path.join(__dirname , "./dist"),
        filename:"bundle.js"
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname , "./src/index.html"),
            filename:"index.html"
        }),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test:/\.scss$/ , use:["style-loader" , "css-loader" , "sass-loader"]},
            {test:/\.css$/ , use:["style-loader" , "css-loader"]},
            {test:/\.js$/ , exclude:/node_modules/ , use:["babel-loader"]},
            {test:/\.vue$/ , use:["vue-loader"]},
            {test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'},
            {test:/\.(jpg|png|gif|bmp|jpeg)/ , use:["url-loader?limit=100&name=[hash:8]-[name].[ext]"]}
        ]
    },
    resolve:{
        alias:{//修改Vue 被导入时候包的路径
             "vue$":"vue/dist/vue.js"
        }
    }
}