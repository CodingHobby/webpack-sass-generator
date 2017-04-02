var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractPlugin = new ExtractTextPlugin({
  filename: 'app.css'
})

module.exports = {
  entry: './src/<%= entry %>',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }

      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    extractPlugin
  ]

}