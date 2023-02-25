import { BrowserTab } from './browserTab.js'
import noobApi from "../noobApi/index.js"
const  { getWndParentElement, getLayoutByElement } =noobApi.布局.util
if (window.require) {
    document.addEventListener('click', onclick, true)
}
function onclick(e) {
    if (e.target.dataset && e.target.dataset.type == 'a' && e.target.dataset.href) {
        e.preventDefault()
        e.stopPropagation()
        let wndElement = getWndParentElement(e.target)
        let layout
        if (!e.target.dataset.href || !e.target.dataset.href.startsWith('http')) {
         return
        }
        if (wndElement) {
            layout = getLayoutByElement(wndElement, siyuan.layout.centerLayout)
            if (layout) {
                layout.addTab((new BrowserTab({ url: e.target.dataset.href, title: e.target.dataset.tilte || e.target.innerHTML })))
            }
            else {
                layout = 展平Layout().find(
                    item => { return item && item.model && item.model.editor }
                )
                layout.parent.addTab((new BrowserTab({ url: e.target.dataset.href, title: e.target.dataset.tilte || e.target.innerHTML })))
            }
        }
        else {
            layout = 展平Layout().find(
                item => { return item && item.model && item.model.editor }
            )
                layout.parent.addTab((new BrowserTab({ url: e.target.dataset.href, title: e.target.dataset.tilte || e.target.innerHTML })))
            
        }
    }
}

export default BrowserTab
export { BrowserTab as BrowserTab }