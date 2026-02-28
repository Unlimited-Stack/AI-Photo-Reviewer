module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Ensure EXPO_ROUTER_APP_ROOT is inlined for web bundling to avoid
    // Metro's `require.context` crash in expo-router/_ctx.web.js.
    plugins: [[require.resolve("./babel-plugin-inline-router-root"), { root: "./app", importMode: "lazy" }]],
  };
};
