const url动作注册表 = []
if (window.require) {
    const { ipcRenderer } = require('electron')
    ipcRenderer.on('siyuan-openurl', (event, msg) => {
        执行URL(msg)
    })
    function 执行URL(url) {
        let url对象 = new URL(url)
        let 路径名 = url对象.pathname.replace('//', '').split('/')[0]
        let 搜索参数 = {}
        url对象.searchParams.forEach(
            (value, key) => { 搜索参数[key] = value }
        )
        console.log(路径名, 搜索参数)
        url动作注册表.forEach(
            注册表项 => {
                console.log(注册表项.动作 === 路径名)

                if (注册表项.动作 === 路径名) {
                    try {
                        (async () => { 注册表项.回调函数(url对象.pathname.replace('//', ''), JSON.parse(JSON.stringify(搜索参数))) })()
                    } catch (e) {
                        console.warn(e)
                    }
                }
            }
        )
    }
}
export default function 注册url动作(动作, 回调函数) {
    url动作注册表.push({ 动作: 动作, 回调函数: 回调函数 })
}
