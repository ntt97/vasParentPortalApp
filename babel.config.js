module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {
        unstable_disableES6Transforms: true,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-private-methods', {loose: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
        ],
        alias: {
          '@store': './src/store',
          '@components': './src/components',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@actions': './src/actions',
          '@constants': './src/constants',
          '@reducers': './src/reducers',
          '@epics': './src/epics',
          '@utils': './src/utils',
          '@sagas': './src/sagas',
        },
      },
    ],
  ],
};
