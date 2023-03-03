const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "backend",
    entry: [ path.join(CURRENT_WORKING_DIR , './backend/server.js') ],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    experiments: {
        topLevelAwait: true
      },
    externals: [nodeExternals()],
    module: {
        noParse:/node_modules\/react-quill\/dist/,
            
            // {test:/\.js$/, exclude:/node_modules/, loaders:['babel']},
            // {test:/\.css$/, exclude:/node_modules/, loaders:['babel']}
        
        rules: [
            {
                loader:'babel-loader',
                test: /\.js$|.jsx$|.ts$/,
                exclude: /node_modules/,
                
            },
            {
                
                test: /\.(ttf|eot|svg|gif|jpg|jpeg|png|woff2|woff|ico|json|webmanifest|)(\?[\s\S]+)?$/,
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
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", "jsx", "scss" ,'.css']
    },
    
}

module.exports = config
