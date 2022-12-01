import { 界面状态 } from '../../status/index.js'
let 待渲染菜单项目数组 = []
let 菜单状态 = {}
function 判断是否文档树菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'use':
                return 判断是否文档树菜单(判定元素.parentElement)
            case 'svg':
                return 判断是否文档树菜单(判定元素.parentElement)
            case 'SPAN':
                if(判定元素.classList&&判定元素.classList.contains('b3-list-item__action')&&判定元素.parentElement.querySelector(`[aria-label="${window.siyuan.languages.newSubDoc}"]`))
                {
                    获取菜单状态(判定元素)
                    return true
                }
        }
    }
}
function 获取菜单状态(判定元素){
    菜单状态.当前块id= 判定元素.parentElement.getAttribute('data-node-id')
     菜单状态.当前文档id = 判定元素.parentElement.getAttribute('data-node-id')
    菜单状态.当前笔记本id =获取笔记本id(判定元素)
}
function 获取笔记本id(判定元素){
    if(判定元素.getAttribute('data-url')){
        return 判定元素.getAttribute('data-url')
    }
    else {
        return 获取笔记本id(判定元素.parentElement)
    }
}
export let 文档树菜单 ={
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
            console.log(目标菜单项, 子菜单项)
            if (!重复子菜单项) {
                目标菜单项.子菜单配置.push(子菜单项)
            }
        }
        else return
    },
    待渲染菜单项目数组,
    判断函数: 判断是否文档树菜单,
    菜单状态: 菜单状态,
}
