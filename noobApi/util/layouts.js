import {展平树 as flattern } from "../util/common.js"

export function getLayoutByElement(el) {
    let array = flattern(window.siyuan.layout.centerLayout)
    let target
    target = array.filter(
        item => {
            return item.id == el.firstChild.dataset.id
        }
    )
    return target[0]
}
export function getClosestLayout(el) {
    if (getLayoutByElement(el)) {
        return getLayoutByElement(el)
    }
    else {
        return getLayoutByElement(el.parentElement)
    }
}
export function getWndParentElement(element) {
    let parent = element.parentElement
    if(parent){
    if (parent.dataset && parent.dataset.type == "wnd") {
        return parent.parentElement
    }
    else {
        return getWndParentElement(parent)
    }
    }
    else return null
}
