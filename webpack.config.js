const path = require('path'); // for different operating systems
const HtmlWebpackPlugin = require('html-webpack-plugin'); // webpack only knows js, so add plugin to read html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // to convert into css file

// environment set in cli through scripts

const baseConfig = {
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, 'app'), 
  entry: {
    app: './app.js',
  }, 
  output: {
    path: path.join(__dirname, 'app/dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    watchContentBase: true,
    publicPath: '/dist/',
    inline: true,
    stats: 'errors-only',
    port: 8000,
  },
  resolve: {
    extensions: ['.js','.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /app/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        include: /app/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  },
  plugins: [/* 
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html'),
      // filename: path.join(__dirname, 'index.html'),
      hash: true,
      chunks: ['app'] // name of the bundle, determined by the key in line 6. add only this bundle
    }), */
    new MiniCssExtractPlugin({
      filename: path.join(__dirname, 'css', '[name].css')
    })
  ]
}


module.exports = function (env) {
  // use env instead of process.env.NODE_ENV & NODE_ENV=dev for different cli
  const isDev = env === 'dev';
  console.log(`${isDev ? 'development' : 'production'} environment`);

  if (isDev) {
    baseConfig.mode = 'development';
  } else {
    baseConfig.mode = 'production';
    baseConfig.plugins.push(
      // ..
    )
  }
  return baseConfig;
};







