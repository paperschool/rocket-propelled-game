module.exports = {
    test: /\.(ts|js)x?$/,
    use: [
        { loader: 'babel-loader' },
        { loader: 'ts-loader' }
    ],
    exclude: /node_modules/,
}

