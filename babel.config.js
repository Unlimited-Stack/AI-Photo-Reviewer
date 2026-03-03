module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // 让 expo-router/_ctx.* 中的 require.context 第一个参数在编译期变为字面量
    plugins: [
      [
        'transform-inline-environment-variables',
        { include: ['EXPO_ROUTER_APP_ROOT', 'EXPO_ROUTER_IMPORT_MODE'] },
      ],
    ],
  };
};
