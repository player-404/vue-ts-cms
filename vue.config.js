// vue.config.js 是对vue-cli 配置好的webpack配置进行一些额外的配置

//使用该帮手函数获得类型提示

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

// const ElementPlus = require("unplugin-element-plus/webpack");

module.exports = {
  publicPath: "./",
  assetsDir: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://152.136.185.210:5000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  // configureWebpack 可以接受一个对象或函数
  // 接收一个对象，里面的配置会与vue-cli配置好的webpack配置合并
  configureWebpack: {
    resolve: {
      alias: {
        // @ vue-cli 已经帮我配置为 src 路径的别名，因此我们可以基于vue-cli的配置进行额外的webpack配置，他们会进行合并
        component: "@/components",
      },
    },
    plugins: [
      //按需自动引入的两个插件配置
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      require("unplugin-element-plus/webpack")({
        // options
      }),
    ],

    // plugins: [ElementPlus({})],
  },

  //接收一个函数， config 参数为 vue-cli 配置好的webpack配置对象，我们可以在此之上添加配置
  /*configureWebpack: (config) => {
    // 因为我们为 alias 重新赋值了一个对象，所以 vue-cli的别名配置丢失了，我们要将重新为src设置别名
    config.resolve.alias = {
      "@": `${__dirname}/src`,
      component: "@/components",
    };
  },*/

  //chainWebpack 接收一个对象 并且可以进行链式操作
  // chainWebpack: (config) => {
  //   config.resolve.alias.set("component", "@/components");
  // },
};
