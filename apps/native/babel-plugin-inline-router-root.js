// Minimal Babel plugin to inline EXPO_ROUTER_APP_ROOT for expo-router on web.
// This avoids Metro crashing on `require.context(process.env.EXPO_ROUTER_APP_ROOT, ...)`.
// Usage in babel.config.js:
//   plugins: [[require.resolve('./babel-plugin-inline-router-root'), { root: './app' }]]

module.exports = function inlineRouterRoot(babel) {
  const { types: t } = babel;

  function isProcessEnvMember(path, name) {
    // Matches: process.env.NAME
    return (
      t.isMemberExpression(path.node) &&
      t.isMemberExpression(path.node.object) &&
      t.isIdentifier(path.node.object.object, { name: 'process' }) &&
      t.isIdentifier(path.node.object.property, { name: 'env' }) &&
      ((t.isIdentifier(path.node.property) && path.node.property.name === name) ||
        (t.isStringLiteral(path.node.property) && path.node.property.value === name))
    );
  }

  return {
    name: 'inline-expo-router-app-root',
    visitor: {
      MemberExpression(path, state) {
        const opts = state.opts || {};
        const appRoot = opts.root || 'app';

        if (isProcessEnvMember(path, 'EXPO_ROUTER_APP_ROOT')) {
          path.replaceWith(t.stringLiteral(appRoot));
          path.skip();
        }

        // Inline import mode: defaults to 'lazy' to match Expo web dev behavior
        if (isProcessEnvMember(path, 'EXPO_ROUTER_IMPORT_MODE')) {
          const mode = typeof opts.importMode === 'string' ? opts.importMode : 'lazy';
          path.replaceWith(t.stringLiteral(mode));
          path.skip();
        }
      },
    },
  };
};
