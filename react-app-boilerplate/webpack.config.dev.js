// This library allows us to combine paths easily
const path = require('path');
// const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
   entry: {
      'index': path.resolve(__dirname, 'src', 'index.js'),
   },
   output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/[name].bundle.js'
   },
   mode: 'development',
   devServer: {
      /* contentBase:
      Tell the server where to serve content from. This is only necessary if you want to serve 
      static files. devServer.publicPath will be used to determine where the bundles should be 
      served from, and takes precedence. */
      contentBase: path.resolve(__dirname, 'src'),
      hot: true,
      port: 8080,
      // https: {
      //    cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
      //    key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      // },
      // proxy: [
      //    {
      //       context: ['/authorize', '/api'],
      //       target: 'https://localhost:8443',
      //       secure: false,
      //       changeOrigin: true,
      //    },
      // ],
   },
   devtool: 'eval-source-map',
   resolve: {
      /* If multiple files share the same name but have different extensions, webpack will 
      resolve the one with the extension listed first in the array and skip the rest. */
      extensions: ['.js', '.jsx'],
      roots: [
         path.resolve(__dirname, 'node_modules'),
         path.resolve(__dirname, 'src')
      ],
      modules: [
         'node_modules',
         path.resolve(__dirname, 'node_modules'),
         path.resolve(__dirname, 'src')
      ],
      alias: {
         'react-dom': '@hot-loader/react-dom'
      }
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },
         {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // Note that postcss loader must come before sass-loader
         },
         {
            test: /\.(svg|png|jpg|gif|ttf)$/,
            use: {
               loader: 'file-loader',
               options: {
                  name: 'images/[name].[ext]',
               }
            }
         }
      ]
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         chunks: ['index', 'vendor'],
         template: path.resolve(__dirname, 'src', 'index.html')
      }),
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      new BundleAnalyzerPlugin(),
   ],
   optimization: {
      splitChunks: { chunks: "all" }
   },
};