const path = require("path");
const baseConfig = require("../base.webpack.config.js");
const { js, css, fonts, svg } = require("./rules");
const plugins = require("./plugins");
const optimisations = require("./optimisations");

module.exports = (env, { mode }) => {
    const isProduction = mode === "production";

    return {
        ...baseConfig,
        module: {
            rules: [
                js,
                css(isProduction),
                fonts,
                svg
            ]
        },
        plugins: [...plugins(isProduction)],
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        entry: "./app/client/index.tsx",
        output: {
            filename: '[name].[chunkhash:4].js',
            path: path.resolve(__dirname, '../../bin/client'),
        },
        optimization: optimisations,
        watch: !isProduction
    }
};