const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = isProduction => ({
    test: /\.(scss|sass|css)$/,
    loader: [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[local]__[hash:base64:5]'
                }
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: !isProduction
            }
        }
    ]
})
