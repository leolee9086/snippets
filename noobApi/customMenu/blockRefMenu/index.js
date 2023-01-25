import { 界面状态 } from '../../status/index.js'
import {获取最近上级块id} from '../../util/dom.js'
let 待渲染菜单项目数组 = []
let 菜单状态 = {}
function 判断是否引用块菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'SPAN':
                菜单状态.引用目标id= 判定元素.getAttribute('data-id')
                菜单状态.引用类型 = 判定元素.getAttribute('data-subtype')
                菜单状态.所在块id = 获取最近上级块id(判定元素)
                return (判定元素.getAttribute('data-type')&&判定元素.getAttribute('data-type').indexOf('block-ref')>-1)
        }
    }
}
export let 引用块菜单 = {
    注册自定义菜单项: (菜单项) => { 待渲染菜单项目数组.push(菜单项) },
    注册自定义子菜单项: (查找条件, 子菜单项) => {
        let 目标菜单项 = 待渲染菜单项目数组.find(
            菜单项 => { return 查找条件(菜单项) }
        )
        if (目标菜单项) {
            !目标菜单项.子菜单配置 ? 目标菜单项.子菜单配置 = [] : null
            let 重复子菜单项 = 目标菜单项.子菜单配置.find(
                待检查项子菜单项 => { return 待检查项子菜单项.id == 子菜单项.id }
            )
            if (!重复子菜单项) {
                目标菜单项.子菜单配置.push(子菜单项)
            }
        }
        else return
    },
    待渲染菜单项目数组,
    判断函数: 判断是否引用块菜单,
    菜单状态: 菜单状态,
}
