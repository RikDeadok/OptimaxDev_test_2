const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    module: `${PATHS.src}/index.js`,
  },
  output: {
    path: `${PATHS.dist}`,
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true

  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      { 
        test: /\.(html)$/, 
        use: [
          'html-loader'
        ] 
      },
      {
        test: /\.m?js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset/image',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/fonts',
      },
    ]
  },
  resolve: {
    alias: {
      '~': PATHS.src,
      '@': `${PATHS.src}/js`,
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/assets/index.html`,
    })
  ]
}
