import  {块标菜单} from './gutterMenu/index.js'
import  {编辑器菜单} from './editorMenu/index.js'
import {文档树菜单} from './filetreeMenu/index.js'
import  {面包屑菜单} from './breadcrumbMenu/index.js'
import {图片菜单} from './imageMenu/index.js'
import { 引用块菜单 } from './blockRefMenu/index.js'
import {批量渲染自定义菜单} from './util/render.js'
let 自定义菜单 ={
    块标菜单,
    编辑器菜单,
    文档树菜单,
    面包屑菜单,
    图片菜单,
    引用块菜单
}
let popup = window.top.siyuan.menus.menu.popup
//这里...args的含义是解构赋值
window.top.siyuan.menus.menu.popup = (...args) => {
    //这里我们就可以为所欲为了,菜单内容这个时候已经渲染完成,所以我们这里对菜单进行的改动都会保留到渲染出来的菜单里面.
    //如果是块标菜单，我们就做点啥
    try {
        for (let 菜单名 in 自定义菜单){
            if(自定义菜单[菜单名].判断函数()&&菜单名!=='当前菜单'){
                自定义菜单.当前菜单 =自定义菜单[菜单名]
                批量渲染自定义菜单(自定义菜单[菜单名].待渲染菜单项目数组)
            }
        }
    } catch (e) {
        console.error(e)
    }
    //为了让菜单能够正常工作,我们把原本的popup函数给加回去
    popup.bind(window.top.siyuan.menus.menu)(...args)
}

export default 自定义菜单