const path = require('path'); // for different operating systems
const webpack = require('webpack');
const merge = require('webpack-merge'); // to merge baseConfig
const CleanWebpackPlugin = require('clean-webpack-plugin'); // clean output
const HtmlWebpackPlugin = require('html-webpack-plugin'); // webpack only knows js, so add plugin to read html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // to convert into css file
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (env) {
  // environment set in cli through npm scripts
  const isDev = env.dev;
  const isProd = env.prod;

  // config for all env:
  const baseConfig = {
    context: path.resolve(__dirname, 'src'), // for './'
    entry: {
      app: './js/app.js', // key: file name ('app'), value: path to bundle
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
            'sass-loader',
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ // define constants in code
        ENV: JSON.stringify(isDev ? 'development' : 'production')
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'custom title',
        text: 'some text',
        template: path.join(__dirname, 'src/index.html'),
        filename: path.join(__dirname, 'dist/index.html'),
        inject: 'body', // this is the default, not needed
        hash: true,
        chunks: ['app'] // name of the bundle, determined by the key in line 6. add only this bundle
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
        inline: true, // dont run my app inside the webpack iframe - this is the default
        stats: 'errors-only',
        port: 8000, // number doesnt matter
      },
      plugins: [
        { // see config
          apply(compiler) {
            compiler.plugin("done", function() {
              console.log(require('util').inspect(compiler.options))
            })
          }
        }
      ]
    })
  }

  if (isProd) {
    return merge(baseConfig, {
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.js$/,
            include: /src/, // or path.join(__dirname, 'src')
            use: {
              loader: 'babel-loader', // compile js only in prod
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
        ]
      },
      optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    })
  }
}