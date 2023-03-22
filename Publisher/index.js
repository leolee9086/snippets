import noobApi from "../noobapi.js";

if (window.$syncer) {
    let allAccounts = []
    window.$syncer.getAccounts(function (resp) {
        console.log('allAccounts', resp)
        allAccounts = resp
        注册菜单项(allAccounts)
    })
}
function 注册菜单项(账户列表) {
    let 发布菜单配置 = {
        id: 'wechatSync',
        文字: `使用wechatSync发布`,
        图标: '#iconInbox',
    }
    noobApi.自定义菜单.文档树菜单.注册自定义菜单项(发布菜单配置)
    noobApi.自定义菜单.编辑器菜单.注册自定义菜单项(发布菜单配置)
    //注意,这里由于两个菜单项注册的其实是同一个菜单配置,所以在一个地方注册子菜单项
    //就会在两边都显示了,所以不要重复注册
    账户列表.forEach(
        账户 => {
            noobApi.自定义菜单.文档树菜单.注册自定义子菜单项(
                (菜单项) => { return 菜单项.id == "wechatSync" },
                {
                    id: 账户.uid,
                    文字: `${账户.title}`,
                    图标: '#iconInbox',
                    点击回调函数: () => { 发布文档到(账户) }
                }
            )
        }
    )
}
async function 发布文档到(账户) {
    let 块id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id
    let stmt = `select * from blocks where id in (select root_id from blocks  where id = "${块id}" )`
    let 文档数据 = (await noobApi.核心api.sql({ stmt: stmt }))[0]
    let 文档内容 = await noobApi.核心api.exportPreview(
        {
            "id": 文档数据.id
        }
    )
    let 文档属性 = await noobApi.核心api.getDocInfo(
        {
            "id": 文档数据.id
        }
    )
    let 发布数据 = {}
    发布数据.title = 文档属性.ial.title
    发布数据.markdown = 文档数据.markdown
    发布数据.content = 转换图片地址(文档内容)
    发布数据.desc = 文档属性.ial.memo
    发布数据.thumb = 文档属性.ial['title-img']
    noobApi.核心api.pushMsg({
        "msg": `准备同步${文档数据.hpath}到${账户.title}`,
        "timeout": 1000
    }
        , ""
    )
    添加任务(发布数据, 账户)
}
function 转换图片地址(文档内容) {
    let div = document.createElement('div')
    div.innerHTML = 文档内容.content ? 文档内容.content : 文档内容.html
    div.querySelectorAll('[src]').forEach(
        el => {
            if (el.getAttribute('src').startsWith('assets')) {
                el.setAttribute('src', window.location.origin + '/' + el.getAttribute('src'))
            }
        }
    )
    div.innerHTML += '<p>本文使用<a href="https://b3log.org/siyuan/">思源笔记</a>写作</p>'
    div.innerHTML += '<p>本文使用<a href="http://publish.chuanchengsheji.com/">椽承设计</a><a href="https://github.com/leolee9086/snippets">小工具</a>配合同步</p>'

    return div.innerHTML
}
function 添加任务(发布数据, 账户) {
    window.$syncer.addTask(
        {
            post: 生成任务(发布数据, 账户),
            accounts: [账户],
        },
        function (status) {
            status.accounts.forEach(account => {
                if (account.editResp) {
                    let a = document.createElement('a')
                    a.setAttribute('href', account.editResp.draftLink)
                    a.setAttribute('target', "_blank")
                    a.setAttribute("referrerPolicy", "no-referrer")
                    a.click()
                    a.remove()
                }
            });
        },
        function () {
            noobApi.核心api.pushMsg({
                "msg": `同步${文档数据.hpath}到${账户.title}完成`,
                "timeout": 1000
            })
        }
    )
}
function 生成任务(发布数据, 账户) {
    var post = {}
    post.title = 发布数据.title
    if (发布数据.content) {
        post.content = 发布数据.content
    } else if (发布数据.markdown) {
        post.markdown = 发布数据.markdown
    }
    if (发布数据.thumb) {
        post.thumb = 发布数据.thumb
    }
    if (发布数据.desc) {
        post.desc = 发布数据.desc

    }
    else {
        post.desc = 发布数据.content ? 发布数据.content.substring(0, 20) : 发布数据.markdown.substring(0, 20)
    }
    return post
}



