const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map',
    devServer:{
        hot:true
    },
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/src/index.js'),
        // 'react-hot-loader/patch', path.join(CURRENT_WORKING_DIR, 'client/App.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        noParse:/node_modules\/react-quill\/dist/,
           
        rules: [
            {
                test: /\.jsx?$|.js?$|.ts?$|.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
                
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|jpeg|png|woff2|woff|ico)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/i,
                use: [
                  {loader:'style-loader',
                  
                },
                {
                    loader:'css-loader',
                    options:{ import : true}
                    
            },
                ],
            },
            {
                test: /\.scss$/i,

                use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        }
        ]
    },  plugins: [
        new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
         
      ].filter(Boolean),
      resolve: {
        
        extensions: [".tsx", ".ts", ".js", ".jsx", ".scss", '.css']
    },
    
}

module.exports = config
