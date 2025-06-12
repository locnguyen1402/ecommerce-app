const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add CSS support for web
config.resolver.assetExts.push("css");

module.exports = withNativeWind(config, { input: "./global.css" });
