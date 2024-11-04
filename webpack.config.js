import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, 
  }, 
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
          options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        },
      },
      },
      {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      },
      {
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
      },
    ],
    },
    resolve: {
    extensions: ['.js', '.jsx'],
    },
    plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
    ],
    devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    },
  };
