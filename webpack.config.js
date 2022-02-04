const path = require( 'path' );

module.exports = {
    watch: true,
    mode: 'development',
    entry: './src/main.ts',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};