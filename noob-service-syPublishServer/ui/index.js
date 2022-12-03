import noobApi from "../../noobApi/index.js";
noobApi.自定义菜单.编辑器菜单.注册自定义菜单项(
    {
        id: '文档发布设置',
        文字: '文档发布设置',
        图标: '#iconInbox',
        子菜单配置: [
            {
                id: '设置为公开发布',
                文字: '设置当前文档为公开发布',
                事件配置: {
                    click: () => 设置当前文档发布属性('public')
                }
            },
            {
                id: '设置当前文档为私密',
                文字: '设置当前文档为私密',
                事件配置: {
                    click: () => 设置当前文档发布属性('private')
                }
            },
            {
                id: '继承上级文档',
                文字: '继承上级文档设置',
                事件配置: {
                    click: () => 设置当前文档发布属性('')
                }
            }
        ]
    }
)
noobApi.自定义菜单.编辑器菜单.注册自定义菜单项(
    {
        id:"复制发布链接",
        文字:'复制发布链接',
        图标:'#iconInbox',
        事件配置:{
            click:写入发布链接到剪贴板
        }
    }
)
async function 写入发布链接到剪贴板(e){
    let 块id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id
    let 文档id = (await 获取所在文档数据(块id)).id
    let 发布链接 =window.location.protocol+'//'+ window.location.hostname+'/'+文档id
    navigator.clipboard.writeText(发布链接)
    if(window.siyuan.ctrlIsPressed){
    window.open(发布链接)
    }
    siyuan.menus.menu.remove()

}
async function 设置当前文档发布属性(属性值) {
    let 块id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id
    let 文档id = (await 获取所在文档数据(块id)).id
    await noobApi.核心api.setBlockAttrs(
        {
            id: 文档id,
            attrs: {
                'custom-publish-access': 属性值
            }
        }
    )
    siyuan.menus.menu.remove()
}
async function 获取所在文档数据(块id) {
    let stmt = `select * from blocks where id in (select root_id from blocks  where id = "${块id}" )`
    let 文档数据 = (await noobApi.核心api.sql({ stmt: stmt }))[0]
    return 文档数据
}