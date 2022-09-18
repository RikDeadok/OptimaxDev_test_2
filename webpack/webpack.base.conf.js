const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    module: ["@babel/polyfill", `${PATHS.src}/index.jsx`],
  },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.dist
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
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     sourceMap: true,
          //     config: { path: `./postcss.config.js` }
          //   }
          // }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     sourceMap: true,
          //     config: { path: `./postcss.config.js` }
          //   }
          // },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
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
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: `${PATHS.src}/${PATHS.assets}img`,
    //       to: `${PATHS.assets}img`
    //     },
    //     {
    //       from: `${PATHS.src}/${PATHS.assets}fonts`,
    //       to: `${PATHS.assets}fonts`
    //     },
    //     {
    //       from: `${PATHS.src}/static`,
    //       to: ''
    //     }
    //   ]
    // }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/assets/index.html`,
    })
  ]
}
