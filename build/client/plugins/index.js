const clean = require("./clean.js");
const css = require("./css.js");
const define = require("./define.js");
const assetManifest = require("./assetManifest.js");

module.exports = (isProduction) => [clean, css, define(isProduction), assetManifest]
