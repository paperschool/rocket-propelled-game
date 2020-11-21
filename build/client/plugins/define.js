const webpack = require('webpack');

module.exports = (isProduction) => {
    return new webpack.DefinePlugin({
        PRODUCTION: isProduction
    })
};