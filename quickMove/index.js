import noobApi from "../noobApi/index.js"
import { 移动块 } from "../noobApi/util/blocks.js"

noobApi.自定义菜单.块标菜单.注册自定义菜单项(
    {
        id: '添加移动目标菜单',
        文字: `设置当前文档为移动目标`,
        图标: `#iconMove`,
        点击回调函数: () => 添加当前目标id()
    }
)
noobApi.自定义菜单.块标菜单.注册自定义菜单项(
    {
        id: '快速移动当前块菜单',
        文字: `快速移动当前块到`,
        图标: `#iconMove`,
    }
)

async function 添加当前目标id() {
    let 当前块id = noobApi.自定义菜单.块标菜单.菜单状态.当前块id
    let 菜单配置 = await 生成菜单配置(当前块id)
    noobApi.自定义菜单.块标菜单.注册自定义子菜单项((菜单项) => { return 菜单项.id == "快速移动当前块菜单" }, 菜单配置)
}
async function 生成菜单配置(块id) {
    let { content, root_id } = await 获取菜单数据(块id)
    return {
        id: root_id,
        //加一段文字
        文字: "移动到:" + content,
        图标: `#iconMove`,
        点击回调函数: () => {
            let 当前块id = noobApi.自定义菜单.块标菜单.菜单状态.当前块id
            移动块(当前块id, 块id)
        }
    }
}
async function 获取菜单数据(块id) {
    let stmt = `select * from blocks where id in (select root_id from blocks  where id = "${块id}" )`
    let 文档数据 = (await noobApi.核心api.sql({ stmt: stmt }))[0]
    return 文档数据
}

noobApi.编辑器.自定义工具栏.注册自定义工具栏按钮(
    {
        id: '快速移动当前块',
        提示: "快速移动当前块",
        图标: `#iconMove`,
        点击回调函数: 显示目标选择面板,
    }
)

function getAllProtyles() {
    let protyles = []
    const getProtyle = (layout) => {
        if (layout.model && layout.model.editor && layout.model.editor.protyle) {
            protyles.push(layout.model.editor.protyle)
        }
        if (layout.children) {
            layout.children.forEach(
                child => getProtyle(child)
            )
        }
    }
    getProtyle(window.top.siyuan.layout.layout)
    return protyles
}
function 获取工具栏对应protyle(工具栏元素) {
    let protyles = getAllProtyles()
    if (protyles) {
        let 当前protyle = protyles.find(
            protyle => {
                return protyle.toolbar.element == 工具栏元素
            }
        )
        return 当前protyle
    }
}
function 获取工具栏对应range(工具栏元素) {
    let protyle = 获取工具栏对应protyle(工具栏元素)
    if (protyle) {
        return protyle.toolbar.range
    }
} 
function 获取工具栏对应块元素(工具栏元素){
        let range  = 获取工具栏对应range(工具栏元素)
        return 获取上层块元素(range.commonAncestorContainer)
}
function  获取上层块元素(dom元素){
    if(dom元素.tagName=='DIV'&&dom元素.getAttribute('data-node-id')){
        return dom元素
    }
    else {
        dom元素 = dom元素.parentElement
        return 获取上层块元素(dom元素)
    }
}
function 生成搜索结果条目(结果条目){
    let div  = document.createElement('div')
    div.innerHTML = `
    <button style="width: calc(100% - 16px)" 
    class="b3-list-item b3-list-item--two" 
    data-item-id="${结果条目.rootID}"
    >
        <div class="b3-list-item__first" style="margin-bottom: 4px">
        <svg class="b3-list-item__graphic popover__block" data-id="${结果条目.rootID}">
            <use xlink:href="#iconMove"></use>
        </svg>
        <span>移动当前块到:</span>   
        ${结果条目.hPath.replace('.sy','')}
        </div>
    </button>
    `
    return div.firstElementChild
}
function 生成搜索结果子条目(结果条目){
    let div  = document.createElement('div')
    div.innerHTML = `
    <div class="b3-list-item" style="color:var(--b3-theme-on-surface)">
    <svg style="padding-left: 22px;"  class="b3-list-item__graphic popover__block" data-id="${结果条目.id}">
        <use xlink:href="#${getIconByType(结果条目.type,结果条目.subtype)}"></use>
    </svg>
    <span class="b3-list-item__text" style="color:var(--b3-theme-on-surface)">${结果条目.content}</span>
    </div>
    `
    return div.firstElementChild
}
export const getIconByType = (type, sub) => {
    let iconName = "";
    switch (type) {
        case "NodeDocument":
            iconName = "iconFile";
            break;
        case "NodeThematicBreak":
            iconName = "iconLine";
            break;
        case "NodeParagraph":
            iconName = "iconParagraph";
            break;
        case "NodeHeading":
            if (sub) {
                iconName = "icon" + sub.toUpperCase();
            } else {
                iconName = "iconHeadings";
            }
            break;
        case "NodeBlockquote":
            iconName = "iconQuote";
            break;
        case "NodeList":
            if (sub === "t") {
                iconName = "iconCheck";
            } else if (sub === "o") {
                iconName = "iconOrderedList";
            } else {
                iconName = "iconList";
            }
            break;
        case "NodeListItem":
            iconName = "iconListItem";
            break;
        case "NodeCodeBlock":
        case "NodeYamlFrontMatter":
            iconName = "iconCode";
            break;
        case "NodeTable":
            iconName = "iconTable";
            break;
        case "NodeBlockQueryEmbed":
            iconName = "iconSQL";
            break;
        case "NodeSuperBlock":
            iconName = "iconSuper";
            break;
        case "NodeMathBlock":
            iconName = "iconMath";
            break;
        case "NodeHTMLBlock":
            iconName = "iconHTML5";
            break;
        case "NodeWidget":
            iconName = "iconBoth";
            break;
        case "NodeIFrame":
            iconName = "iconLanguage";
            break;
        case "NodeVideo":
            iconName = "iconVideo";
            break;
        case "NodeAudio":
            iconName = "iconRecord";
            break;
    }
    return iconName;
};

async function 显示目标选择面板(event) {
    let 工具栏元素 = event.currentTarget.parentElement
    let 按钮元素 = event.currentTarget
    let 搜索结果 = await noobApi.核心api.全文搜索块({ query: 获取工具栏对应range(工具栏元素).toString() })
    console.log(搜索结果)
    let 面板元素 = 工具栏元素.parentElement.querySelector('.protyle-hint')
    面板元素.innerHTML=''
    let 当前块id = 获取工具栏对应块元素(工具栏元素).getAttribute('data-node-id')
    搜索结果.blocks.forEach(
        结果条目 => {
            if (!面板元素.querySelector(`[data-item-id="${结果条目.rootID}"]`)) {
                let 条目元素  = 生成搜索结果条目(结果条目)
                条目元素.addEventListener('mousemove',()=>{条目元素.classList.add("b3-menu__item--current")},true)
                条目元素.addEventListener('mouseleave',()=>{条目元素.classList.remove("b3-menu__item--current")},true)
                条目元素.appendChild(生成搜索结果子条目(结果条目))
                条目元素.addEventListener('click',()=>{移动块(当前块id,结果条目.id,)},true)
                面板元素.appendChild(条目元素)
                面板元素.insertAdjacentHTML("beforeEnd",`<button class="b3-menu__separator"></button>`)

            }
            else{
                面板元素.querySelector(`[data-item-id="${结果条目.rootID}"]`).appendChild(生成搜索结果子条目(结果条目))
            }
        }
    )
    面板元素.classList.remove('fn__none')
    面板元素.style.top = 工具栏元素.offsetTop + 36 + 'px'
    面板元素.style.left = 工具栏元素.offsetLeft + 按钮元素.offsetLeft + 'px'
    if((工具栏元素.offsetLeft + 按钮元素.offsetLeft+610)>document.offsetWidth){
        面板元素.style.left = document.offsetWidth-610+'px'
    }
    面板元素.style.width = '600px'
    面板元素.style.maxHeight = '800px'

}
