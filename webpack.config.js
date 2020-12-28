const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    // Development mode by default
    mode: 'development',

    entry: './src/index.ts',

    context: path.resolve(__dirname),

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    output: {
        // Output to public/dist
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'js/index.js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            // typescript
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // babel
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            // css extract
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // css/sass loader
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                // Use autoprefixer
                                plugins: ['autoprefixer']
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            // file loader
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            // url loader
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            // extract to public/dist/img
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // eslint
        new ESLintPlugin({
            extensions: ['ts', 'js'],
            fix: true,
            emitWarning: true
        }),
        // stylelint
        new StylelintPlugin({
            fix: true,
            emitWarning: true
        }),
        // css extract
        new MiniCssExtractPlugin({
            // extract to public/dist/css
            filename: 'css/[name].css'
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        port: 3001,
        watchContentBase: true
    }
}
