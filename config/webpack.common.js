const paths = require('./paths')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [paths.src + '/index.js'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.src + '/assets',
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'National Missing and Unidentified Persons Kenya',
      favicon: paths.src + '/assets/icons/favicon.svg',
      template: paths.public + '/index.html', // template file
      filename: 'index.html', // output file
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  module: {
    rules: [
      {test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader']},
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(less|scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {sourceMap: true, importLoaders: 1},
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              // importLoaders: 1,
              lessOptions: {
                modifyVars: {
                  'primary-color': '#ff0000',
                },
                javascriptEnabled: true,
              },
            },
          },
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
    ],
  },
}
