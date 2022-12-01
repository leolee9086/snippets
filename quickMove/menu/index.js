import noobApi from "../../noobApi/index.js";
const { 根据目标id移动块到文档, 根据目标id移动块所在文档} =noobApi.内容块
export default function 注册菜单(){
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
    let 快速移动文档菜单项 =    {
        id: '快速移动当前文档菜单',
        文字: `快速移动当前文档到`,
        图标: `#iconMove`,
    }
    
    noobApi.自定义菜单.编辑器菜单.注册自定义菜单项(快速移动文档菜单项)
    noobApi.自定义菜单.文档树菜单.注册自定义菜单项(快速移动文档菜单项)

    async function 添加当前目标id() {
        let 当前块id = noobApi.自定义菜单.块标菜单.菜单状态.当前块id
        noobApi.自定义菜单.块标菜单.注册自定义子菜单项((菜单项) => { return 菜单项.id == "快速移动当前块菜单" }, await 生成移动块菜单配置(当前块id))
        //这里你会发现,文档树菜单中的菜单也出现了子项目,这是因为他们都是引用了同一个对象.
        noobApi.自定义菜单.编辑器菜单.注册自定义子菜单项((菜单项) => { return 菜单项.id == "快速移动当前文档菜单" }, await 生成移动文档菜单配置(当前块id))
        //所以实际上你也可以这样:
        /*
        !快速移动文档菜单项.子菜单配置?快速移动文档菜单项.子菜单配置=[]:null
        快速移动文档菜单项.子菜单配置.push(await 生成移动文档菜单配置(当前块id))
        */ 
    }
    async function 生成移动块菜单配置(块id) {
        console.log(块id)
        let { content, root_id } = await 获取菜单数据(块id)
        return {
            id: root_id,
            //加一段文字
            文字: "移动当前块到:" + content,
            图标: `#iconMove`,
            点击回调函数: () => {
                let 当前块id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id
                根据目标id移动块到文档(当前块id, 块id)
            }
        }
    }
    async function 生成移动文档菜单配置(块id) {
        let { content, root_id } = await 获取菜单数据(块id)
        return {
            id: root_id,
            //加一段文字
            文字: "移动当前文档到:" + content,
            图标: `#iconMove`,
            点击回调函数: () => {
                let 当前块id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id

                根据目标id移动块所在文档(当前块id, 块id)
            }
        }
    }
    async function 获取菜单数据(块id) {
        let stmt = `select * from blocks where id in (select root_id from blocks  where id = "${块id}" )`
        let 文档数据 = (await noobApi.核心api.sql({ stmt: stmt }))[0]
        return 文档数据
    }
}