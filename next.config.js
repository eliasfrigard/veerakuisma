const withFonts = require('next-fonts')

module.exports = withFonts({
  reactStrictMode: true,
  swcMinify: true,

  webpack(config, options) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts',
          publicPath: '/_next/static/fonts',
        },
      },
    })

    return config
  },
})
