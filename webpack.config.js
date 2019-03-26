module.exports = {
  "watch": true,
  "mode": "development",
  "entry": "./src/index.js",
  "optimization": {
      // We no not want to minimize our code.
    "minimize": false
  },
  "output": {
    "path": __dirname + '/public/js',
    "filename": "[name].js"
  },
  "module": {
    "rules": [{
        "enforce": "pre",
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": "eslint-loader"
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "@babel/preset-env"
            ]
          }
        }
      }
    ]
  }
}
