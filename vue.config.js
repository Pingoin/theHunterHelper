/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "./dist/frontend"),
  assetsDir: "./assets",
  devServer: {
    proxy: {
        '^/api': {
            target: 'http://localhost:8080'
        },
        '^/docs': {
            target: 'http://localhost:8080'
        }
    }
}
};
