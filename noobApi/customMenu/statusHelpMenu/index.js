import { 界面状态 } from '../../status/index.js'
import {自定义菜单原型} from '../customMenu.js'
let 状态栏帮助菜单 = new 自定义菜单原型()

function 判断状态栏帮助菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'use':
                return 判断状态栏帮助菜单(判定元素.parentElement)
            case 'svg':
                return 判断状态栏帮助菜单(判定元素.parentElement)
            case 'BUTTON':
                return 判断状态栏帮助菜单(判定元素.parentElement)
            case 'DIV':
                return 判定元素.id==="statusHelp"
        }
    }
}
状态栏帮助菜单.判断函数 = 判断状态栏帮助菜单
export {状态栏帮助菜单 as 状态栏帮助菜单}
