import noobApi from '../noobApi/index.js'
import { 工作空间路径 } from '../noobApi/util/file.js'
if (window.require) {
    const path = require('path')
    const vite = require('vite')
    let vite服务注册表 = {}
    let 白板开发服务 = await 创建vite服务(工作空间路径 + '/data/viteWidgets/whiteBoard', 6809)
    console.log(白板开发服务)

    function 创建vite服务(文件夹路径, 端口) {
        return new Promise((resolve, reject) => {
            let vite配置文件路径 = path.join(文件夹路径, 'vite.config.js')
            if (!vite服务注册表.文件夹路径) {
                vite.createServer({
                    configFile: vite配置文件路径,
                    root: 文件夹路径,
                }).then(server => {
                    vite服务注册表[文件夹路径] = server
                    server.listen(端口)
                    window.open(`http://127.0.0.1:${端口}`)
                    resolve(server)
                }
                )
            }

        })
    }
}
