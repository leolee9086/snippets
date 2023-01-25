import { 获取全部原始数据 } from "../../../noob-service-syPublishServer/server/util/pipe.js";
function 生成面板() {
    let html = `
    <div class="fn__flex fn__flex-1" style="min-height: 64px; transition: var(--b3-width-transition); height: 652px;">
        <div data-type="wnd" data-id="" class="fn__flex-column fn__flex fn__flex-1">
            <ul class="fn__flex layout-tab-bar"></ul>
            <div class = "layout-tab-container fn__flex-1">
                <div class="fn__flex-1 fn__flex-column file-tree sy__file">
                    <div class="block__icons">
                        <div class="block__logo">
                            <svg><use xlink:href="#iconAlignCenter"></use></svg>
                            文档树
                        </div>                    
                    </div>
                </div> 
            </div>
        </div>
    </div>
    `
    return html
}
export function 生成文档树根节点(document) {
    let 文档树面板html = 生成面板()
    document.getElementById('panelLeft').innerHTML += 文档树面板html
    获取全部原始数据(document).notebooks
        .forEach(
            笔记本数据 => document.getElementById('panelLeft').querySelector('.sy__file').innerHTML += 生成笔记本条目(笔记本数据)
        )
}
export function 生成笔记本条目(笔记本数据) {
    return `
    <ul class="b3-list b3-list--background" data-url="${笔记本数据.id}" data-type="notebook" data-sort="12">

    <li class="b3-list-item b3-list-item--hide-action"  data-type="navigation-root" data-path="/">
    <span class="b3-list-item__toggle">
        <svg class="b3-list-item__arrow"><use xlink:href="#iconRight"></use></svg>
    </span>
    <span class="b3-list-item__icon b3-tooltips b3-tooltips__e" aria-label="修改图标">
        <svg class="custom-icon">
            <use xlink:href="#icon-1f4d4"></use>
        </svg>
    </span>
    <span class="b3-list-item__text">${笔记本数据.name}</span>
    </li>
    <ul class><ul>
</ul>
`;
}