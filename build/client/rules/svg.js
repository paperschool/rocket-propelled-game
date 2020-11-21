module.exports = {
    test: /\.svg$/,
    use: [
        {
            loader: '@svgr/webpack'
        }
    ],
    exclude: /node_modules/,
}

