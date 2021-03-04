const path=require('path')

const HtmlWebpackPlugin=require('html-webpack-plugin')//导入在内存中自动生成的index页面的插件
//创建一个插件的实例对象
const htmlPlugin=new HtmlWebpackPlugin({
template:path.join(__dirname,'./src/index.html'),//源文件
filename:'index.html'//生成的内存中首页的名称
})




//向外暴露一个大包配置对象；
module.exports={
    //...other code
    devServer: {
        contentBase: './dist',
        port: '8080',
        host: 'localhost',
        hot:true,
        inline:true,  //缺少该配置，会出现上面的错误
        historyApiFallback:true,  //缺少该配置，会出现上面的错误
      https:true,
        proxy: { //设置代理
            "/api": {
              target: "https://localhost:44323",
              secure: false,
              changeOrigin:true,
              
          

            }
          }
    },
entry: path.resolve(__dirname, 'src/index.js'),
output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

mode:'development',//development production
plugins:[
  htmlPlugin
],

        module: {
        		rules: [
        		    {
        		        test: /\.css/,
        		        use: ['style-loader', 'css-loader'],
        		      
        		        
        		    },
        		    {
                test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images',
                            esModule: false,
                        }
                    }
                ]
            },
             {
                test: /\.less/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
             {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            "plugins": [
                                          [
                                            "@babel/plugin-proposal-class-properties",
                                            {
                                              "loose": true
                                            }
                                          ]
                                        ]
                                 }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },

        		]
    		}


}
