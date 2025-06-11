module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      // Required for Expo Router
      "expo-router/babel",
      // NativeWind v4 plugin
      "nativewind/babel",
    ],
  };
};
