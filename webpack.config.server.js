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
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png|woff2|woff)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
           
           
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", "scss"]
    },
    
}

module.exports = config
