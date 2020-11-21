module.exports = {
    test: /\.(json)x?$/,
    use: [
        { loader: 'json-loader' },
    ],
    exclude: /node_modules/,
}

