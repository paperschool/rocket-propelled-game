const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = new WebpackAssetsManifest({
    integrity: true,
    integrityHashes: ["sha256"]
});