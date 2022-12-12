import 注册菜单 from "./menu/index.js"
import 注册工具栏 from "./toolbar/index.js"
import noobApi from '../noobApi/index.js'
注册菜单()
注册工具栏()
document.addEventListener('keydown', (e) => {
    if ('KeyX' === e.code && e.ctrlKey && e.shiftKey) {

        if (!window.当前待移动块id) {
            window.当前待移动块id = 获取最近上级块id(getSelection().getRangeAt(0).commonAncestorContainer)
            console.log(window.当前待移动块id)

        }
        else {
            let 当前移动目标id = 获取最近上级块id(getSelection().getRangeAt(0).commonAncestorContainer)
            移动块(window.当前待移动块id, 当前移动目标id)
        }
    }
}
)

function 获取最近上级块id(target) {
    console.log(target)
    if (target.getAttribute && target.getAttribute("data-node-id")) {
        return target.getAttribute("data-node-id")
    }
    else if (target.parentElement) {
        return 获取最近上级块id(target.parentElement)
    }
}
async function 移动块(当前待移动块id, 当前移动目标id) {
    let 当前移动目标属性 = await noobApi.核心api.sql({ stmt: `select * from blocks where id = '${当前移动目标id}'` })
    if (当前移动目标属性.type !== 'd') {
        let 父块id = 当前移动目标属性[0].parent_id
        let 当前块dom = (await noobApi.核心api.获取文档({ id: 当前待移动块id, size: 102400 }, '')).content

        await noobApi.核心api.删除块({ id: 当前待移动块id })
        await noobApi.核心api.插入块(
            {
                "dataType": "dom",
                "data": 当前块dom,
                "parentID": 父块id,
                "previousID": 当前移动目标id
            }
        )
        window.当前待移动块id = ''
    }
}