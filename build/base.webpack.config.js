module.exports = {
    module: {
        rules: [],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.css', '.scss', '.json', '.svg'],
    },
    stats: {
        warnings: false
    },
    externals: {
        uws: 'uws'
    }
}