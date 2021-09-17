const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: {
        index: "./scripts/index.js",
        create: "./scripts/createRecord.js",
        update: "./scripts/updateRecord.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
        publicPath: ""
    },
    mode: "production",
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }]
    },
    plugins: [
        new WebpackPwaManifest({
            filename: "manifest.json",
            inject: false,
            fingerprints: false,
            "name": "Client Rolodex",
            "short_name": "Rolodex",
            "icons": [
                {
                    src: path.resolve(
                        __dirname,
                        "./assets/black-favicon.png"
                    ),
                    size: [72, 96, 128, 144, 152, 192, 384, 512]
                }
            ],
            "theme_color": "#ffffff",
            "background_color": "#ffffff",
            "start_url": "/",
            "display": "standalone"
        })
    ]
};
module.exports = config;
