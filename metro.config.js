const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Force the watcher to be more stable
config.watcher.additionalWatchRootConfigs = [];

module.exports = withNativeWind(config, {
  input: "./src/global.css",
});
