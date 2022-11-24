import noobApi from "../noobApi/index.js"

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

