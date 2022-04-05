import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//样式重置
import "normalize.css";
import "@/assets/css/index.scss";

//animate.css
import "animate.css";

// import app from "./global/index";
//全局引入element-plus
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

createApp(App).use(store).use(router).mount("#app");
