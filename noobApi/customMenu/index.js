import {生成单个dom元素} from '../util/dom.js'
let 待渲染菜单项目数组 = [

]
let 菜单状态 = { 当前块id: '' }
function 更新当前块id(目标元素) {
    switch (目标元素.tagName) {
        case 'use':
            更新当前块id(目标元素.parentElement)
            break
        case 'svg':
            更新当前块id(目标元素.parentElement)
            break
        case 'BUTTON':
            菜单状态.当前块id = 目标元素.getAttribute('data-node-id')
    }
}
document.addEventListener(
    'click', (event) => { 更新当前块id(event.target) }, true
)


let popup = window.top.siyuan.menus.menu.popup
//这里...args的含义是解构赋值
window.top.siyuan.menus.menu.popup = (...args) => {
    //这里我们就可以为所欲为了,菜单内容这个时候已经渲染完成,所以我们这里对菜单进行的改动都会保留到渲染出来的菜单里面.
    //如果是块标菜单，我们就做点啥
    try {
        if (判断是否块标菜单()) {
            批量渲染自定义菜单(待渲染菜单项目数组)
        }
    } catch (e) {
        console.error(e)
    }
    //为了让菜单能够正常工作,我们把原本的popup函数给加回去
    popup.bind(window.top.siyuan.menus.menu)(...args)
}
// 实际的渲染过程
//这里默认要渲染的就是那个设置当前目标id的菜单项了
function 批量渲染自定义菜单(待渲染菜单项目数组) {
    待渲染菜单项目数组.forEach(
        菜单项目 => {
            渲染自定义菜单(菜单项目)
        }
    )
}
function 渲染自定义菜单(菜单项目) {
    let 菜单元素 = 生成多级菜单项目元素(菜单项目)
    插入菜单元素(菜单元素)
}
function 判断是否块标菜单() {
    let 菜单元素 = window.top.siyuan.menus.menu.element
    return 菜单元素.innerText.indexOf("Ctrl+Alt+A/Shift+Click") >= 0
}
function 插入菜单元素(菜单项目元素) {
    window.top.siyuan.menus.menu.append(菜单项目元素)
}
//用来生成和插入元素
function 生成菜单项目元素(菜单项配置) {
    let 菜单项模板 = `
    <button class="b3-menu__item" data-item-id="${菜单项配置.id}">
        <svg class="b3-menu__icon" style="">
            <use xlink:href="${菜单项配置.图标}"></use>
        </svg>
        <span class="b3-menu__label">${菜单项配置.文字}</span>
    </button>
    `
    /*let 临时容器 = document.createElement('div')
    临时容器.innerHTML = `
        <button class="b3-menu__item" data-item-id="${菜单项配置.id}">
            <svg class="b3-menu__icon" style="">
                <use xlink:href="${菜单项配置.图标}"></use>
            </svg>
            <span class="b3-menu__label">${菜单项配置.文字}</span>
        </button>
	`
    //起个名字让它好记一点嘛
    let 菜单项元素 = 临时容器.firstElementChild
    菜单项元素.addEventListener("click", 菜单项配置.点击回调函数)*/
    if(菜单项配置.点击回调函数){
    return 生成单个dom元素(菜单项模板,菜单项配置.点击回调函数)
    }else{
        return 生成单个dom元素(菜单项模板,菜单项配置.事件配置)
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


let 自定义块标菜单 = {
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
            console.log(目标菜单项,子菜单项)
            if(!重复子菜单项){
                目标菜单项.子菜单配置.push(子菜单项)
            }
        }
        else return 
    },
    菜单状态:菜单状态,
    生成多级菜单项目元素:生成多级菜单项目元素
}

export default 自定义块标菜单