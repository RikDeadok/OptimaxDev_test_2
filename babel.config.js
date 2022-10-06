module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  env: {
    test: {
      plugins: ['dynamic-import-node'],
    },
    production: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
};
