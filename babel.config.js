module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': '.',
            '@components': './components',
            '@screens': './screens',
            '@assets': './assets',
            '@types': './types',
            '@utils': './utils',
            '@hooks': './hooks',
            '@context': './context',
            '@constants': './constants'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
