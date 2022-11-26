import * as block from './util/blocks.js'
import 核心api from './util/kernelApi.js'
import 自定义块标菜单 from './customMenu/index.js'
import 添加自定义随机背景图 from './customBackground/index.js'
import 自定义工具栏 from './customToolbar/index.js'
import {生成单个dom元素} from './util/dom.js'
import 工作空间  from './workspace/index.js'
添加自定义随机背景图()
let noobApi={
	自定义菜单:{
		块标菜单:自定义块标菜单
	},
    内容块:block,
    编辑器:{
        自定义工具栏:自定义工具栏
    },
    核心api:核心api,
    DOM工具:{
        生成单个dom元素
    }
}
window.noobApi = noobApi
if(window.require){
    let {监听文件修改}= await import('./util/file.js')
    let 监听选项 = {
        监听路径:工作空间.代码片段路径,
        监听配置:{
            persistent :true,
            recursive :true
        },
        文件类型:['js'],
        事件类型:['change']
    }
    监听文件修改(监听选项)
}