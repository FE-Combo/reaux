function createConfig (config) {
    return {
        contentBase:config.contentBase,
        historyApiFallback: true,
        hot: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        stats: {
            colors: true,
        },
    }
}

module.exports = createConfig;