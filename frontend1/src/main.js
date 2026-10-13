import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'

import Element from "element-plus"
import "element-plus/dist/index.css"

//导包
import axios from 'axios'

require("./mock.js")

//Vue.config.productionTip = false

const app = createApp(App)

//全局挂载axios（Vue3的方式）
app.config.globalProperties.$axios=axios

require("./mock")//引入mock数据，关闭则注释这一行

//注册插件
app.use(router)

app.use(store)

app.use(Element)

app.mount('#app')
