const path = require("path");

// const URL = "https://spot-web.shop";
// const URL = "http://www.spotbuddy.co.kr:8080"; // v2-test
const URL = "http://3.35.213.43:8080"; // v2-test

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: URL,
        changeOrigin: true
      },
      "/imageFile": {
        target: URL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/_variables.scss";`
      }
    }
  },

  configureWebpack: {
    // resolve.alias는 모듈을 더 쉽게 import, require 하게 만듭니다.
    resolve: {
      alias: {
        scss: path.resolve("./src/assets/scss"),
        // '@'는 현재 프로젝트의 client/src/까지의 최종 경로를 의미합니다.
        "@": path.join(__dirname, "src/")
      }
    }
  },

  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "spot";
      return args;
    });
  },

  transpileDependencies: ["vuetify"]
};
