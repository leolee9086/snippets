//用来生成和插入元素
import { 生成单个dom元素 } from "../../util/dom.js"
function 生成菜单项目元素(菜单项配置) {
    let 菜单项模板 = `
    <button class="b3-menu__item" data-item-id="${菜单项配置.id}">
        <svg class="b3-menu__icon" style="">
            <use xlink:href="${菜单项配置.图标}"></use>
        </svg>
        <span class="b3-menu__label">${菜单项配置.文字}</span>
    </button>
    `
    if (菜单项配置.点击回调函数) {
        return 生成单个dom元素(菜单项模板, 菜单项配置.点击回调函数)
    } else {
        return 生成单个dom元素(菜单项模板, 菜单项配置.事件配置)
    }
}
function 生成多级菜单项目元素(菜单项配置) {
    let 菜单项元素 = 生成菜单项目元素(菜单项配置)
    if (菜单项配置.子菜单配置 && 菜单项配置.子菜单配置[0]) {
        菜单项元素.insertAdjacentHTML("beforeend", `<div class="b3-menu__submenu"></div>`)
        let 子菜单容器 = 菜单项元素.querySelector('div')
        菜单项配置.子菜单配置.forEach(
            子菜单项配置 => {
                try {
                    子菜单容器.appendChild(生成多级菜单项目元素(子菜单项配置))
                } catch (e) {
                    console.error(e)
                }
            }
        )
    }
    return 菜单项元素
}
function 渲染自定义菜单(菜单项目) {
    let 菜单元素 = 生成多级菜单项目元素(菜单项目)
    插入菜单元素(菜单元素)
}
function 插入菜单元素(菜单项目元素) {
    window.top.siyuan.menus.menu.append(菜单项目元素)
}
export  function 批量渲染自定义菜单(待渲染菜单项目数组) {
    待渲染菜单项目数组.forEach(
        菜单项目 => {
            if(菜单项目.判定函数){
                菜单项目.判定函数()?渲染自定义菜单(菜单项目):null
            }
            else{
                渲染自定义菜单(菜单项目)
            }
        }
    )
}