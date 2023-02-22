const path = require('path')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    mode: "production",
    entry: [
        path.join(CURRENT_WORKING_DIR, 'client/src/index.js'),
        // 'react-hot-loader/patch', path.join(CURRENT_WORKING_DIR, 'client/App.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png|woff2|woff)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/i,
                use: [
                  {loader:'style-loader',
                  
                },
                {
                    loader:'css-loader',
                    
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
        extensions: [".tsx", ".ts", ".js", "scss"]
    },
}

module.exports = config
