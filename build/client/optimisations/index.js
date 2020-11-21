module.exports = {
    splitChunks: {
        cacheGroups: {
            vendors: {
                name: "vendor",
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            app: {
                name: "app",
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        },
        chunks: 'all'
    }
}