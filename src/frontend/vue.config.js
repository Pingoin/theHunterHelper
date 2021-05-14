module.exports = {
  outputDir: "../../dist/frontend",
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    proxy: {
        "^/api": {
            target: "http://localhost:8080"
        },
        "^/docs": {
            target: "http://localhost:8080"
        }
    }
  }
}; 
