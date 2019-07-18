const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (env) {
  const isDev = env.dev;
  const isProd = env.prod;

  const baseConfig = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './js/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].bundle.js', // [name] grabbed from the entry key
    },
    module:  {
      rules: [
        {
          test: /\.scss$/,
          include: /src/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer')
                  ]
                }
              }
            },
            'sass-loader',
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ // define constants in code
        ENV: JSON.stringify(isDev ? 'dev' : 'prod')
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        hash: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
  }

  // dev environment
  if (isDev) {
    return merge(baseConfig, {
      mode: 'development',
      devtool: 'cheap-module-eval-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        stats: 'errors-only',
        port: 8000,
      },
      plugins: [
        new CopyWebpackPlugin([
          {from: 'images', to: 'images'}
        ]),
      ],
      module: {
        rules: [
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'images',
                  name: '[name].[hash].[ext]'
                }
              },
              {
                loader: 'image-webpack-loader',
              }
            ]
          },
        ]
      }
    })
  }

  if (isProd) {
    return merge(baseConfig, {
      mode: 'production',
      output: {
        path: path.resolve(__dirname, 'docs')
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: /src/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    debug: true,
                    targets: {
                      browsers: ['defaults']
                    }
                  }]
                ],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'images',
                  name: '[name].[ext]'
                }
              },
              {
                loader: 'image-webpack-loader',
              }
            ]
          },
        ]
      },
      optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin(),
          new UglifyJsPlugin(),
          new CopyWebpackPlugin([
            {
              from: 'images/logo.png',
              to: 'images/logo.png'
            }
          ]),
        ]
      },
    })
  }
}