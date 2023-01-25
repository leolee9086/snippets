import { 界面状态 } from '../../status/index.js'
import {自定义菜单原型} from '../customMenu.js'
let 块标菜单 = new 自定义菜单原型()

function 判断是否块标菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'use':
                return 判断是否块标菜单(判定元素.parentElement)
            case 'svg':
                return 判断是否块标菜单(判定元素.parentElement)
            case 'BUTTON':
                return 判断是否块标菜单(判定元素.parentElement)
            case 'DIV':
                if (判定元素.classList && 判定元素.classList.contains('protyle-gutters')) {
                    块标菜单.菜单状态.当前块id = 判定元素.querySelector('BUTTON').getAttribute('data-node-id')
                    块标菜单.菜单状态.当前块类型 = 判定元素.querySelector('BUTTON').getAttribute('data-type')
                    块标菜单.菜单状态.当前子块类型 = 判定元素.querySelector('BUTTON').getAttribute('data-subType')
                }                    
                return 判定元素.classList && 判定元素.classList.contains('protyle-gutters')
        }
    }
}
块标菜单.判断函数 = 判断是否块标菜单
export {块标菜单 as 块标菜单}
