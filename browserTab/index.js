import noobApi from '../noobApi/index.js'
import browserTab from './browserTab.js'
let {getWndParentElement,getLayoutByElement} = noobApi.layouts.util
document.addEventListener('click',onclick,true)
function onclick(e) {
    if (e.target.dataset && e.target.dataset.type == 'a') {
        e.preventDefault()
        e.stopPropagation()
    
        let wndElement = getWndParentElement(e.target)
        let layout = getLayoutByElement(wndElement, siyuan.layout.centerLayout)
        layout.addTab((new browserTab({ url: e.target.dataset.href, title: e.target.dataset.tilte || e.target.innerHTML })))
    }
}