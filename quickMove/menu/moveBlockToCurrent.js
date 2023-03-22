import noobApi from "../noobapi.js";
const {根据id移动块到目标id后} = noobApi.内容块
export default function 注册菜单(){
    noobApi.自定义菜单.块标菜单.注册自定义菜单项(
        {
            id: '添加待移动块菜单',
            文字: `添加当前块为待移动`,
            图标: `#iconMove`,
            点击回调函数: () => 添加当前块id()
        }
    )
    noobApi.自定义菜单.块标菜单.注册自定义菜单项(
        {
            id: '移动已记录块到当前位置菜单',
            文字: `移动已记录块到当前位置`,
            图标: `#iconMove`,
        }
    )
}
async function 添加当前块id(){
    let 当前块id = noobApi.自定义菜单.块标菜单.菜单状态.当前块id
    noobApi.自定义菜单.块标菜单.注册自定义子菜单项((菜单项) => { return 菜单项.id == "移动已记录块到当前位置菜单" }, await 生成移动块菜单配置(当前块id))
}
async function 生成移动块菜单配置(块id) {
    let { content, root_id } = await 获取菜单数据(块id)
    return {
        id: root_id,
        //加一段文字
        文字: "移动到当前位置后:" + content,
        图标: `#iconMove`,
        点击回调函数: () => {
            let 当前块id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id
            根据id移动块到目标id后(块id, 当前块id)
        }
    }
}
async function 获取菜单数据(块id) {
    let stmt = `select * from blocks   where id = "${块id}" `
    let 块数据 = (await noobApi.核心api.sql({ stmt: stmt }))[0]
    return 块数据
}

document.addEventListener('keydown', async(e) => {
    if ('KeyX' === e.code && e.ctrlKey && e.shiftKey) {

        if (!noobApi.内容块.当前待移动块id ) {
            noobApi.内容块.当前待移动块id  = 获取最近上级块id(getSelection().getRangeAt(0).commonAncestorContainer)
            noobApi.自定义菜单.块标菜单.注册自定义子菜单项((菜单项) => { return 菜单项.id == "移动已记录块到当前位置菜单" }, await 生成移动块菜单配置(noobApi.内容块.当前待移动块id))

        }
    }
    if ('KeyM' === e.code && e.ctrlKey && e.shiftKey) {
        
        if (noobApi.内容块.当前待移动块id )  {
            let 当前移动目标id = 获取最近上级块id(getSelection().getRangeAt(0).commonAncestorContainer)
            await noobApi.内容块.根据id移动块到目标id后(noobApi.内容块.当前待移动块id , 当前移动目标id)
            noobApi.内容块.当前待移动块id =''
        }
        
    }
}
)

function 获取最近上级块id(target) {
    if (target.getAttribute && target.getAttribute("data-node-id")) {
        return target.getAttribute("data-node-id")
    }
    else if (target.parentElement) {
        return 获取最近上级块id(target.parentElement)
    }
}
