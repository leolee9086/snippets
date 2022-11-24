import { 移动块 } from './util/blocks.js'
import 核心api from './util/kernelApi.js'
import 自定义块标菜单 from './customMenu/index.js'
import 添加自定义随机背景图 from './customBackground/index.js'
添加自定义随机背景图()
let noobApi={
	自定义菜单:{
		块标菜单:自定义块标菜单
	},
    内容块:{
        移动块:移动块
    },
    核心api:核心api
}
window.noobApi = noobApi