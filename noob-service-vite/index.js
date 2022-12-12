import noobApi from '../noobApi/index.js'
import { 读取挂件列表 } from './util/file.js'
import { 获取可用端口号 } from './util/port.js'

if (window.require) {
    const path = require('path')
    const vite = require('vite')
    const express = require('express')
    let vite服务注册表 = {}
    读取挂件列表().forEach(
        挂件属性 => {
            创建vite服务(挂件属性.path)
        }
    )
    function 创建vite服务(文件夹路径) {
        return new Promise(async (resolve, reject) => {
            let vite配置文件路径 = path.join(文件夹路径, 'vite.config.js')
            if (!vite服务注册表.文件夹路径) {

                let vite中间件 = await vite.createServer({
                    configFile: vite配置文件路径,
                    root: 文件夹路径,
                    server: {
                        middlewareMode: "html"
                    }
                })
                const app = express()
                !vite服务注册表[文件夹路径] ? vite服务注册表[文件夹路径] = {} : null
                vite服务注册表[文件夹路径]['server'] = app
                let port = vite中间件.config.server.port || 6807
                port = await 获取可用端口号(port)
                let server = await app.listen(port, '127.0.0.1', async () => {
                    vite服务注册表[文件夹路径]['port'] = port
                    vite服务注册表[文件夹路径]['server'] = server
                    vite服务注册表[文件夹路径]['app'] = app
                    vite服务注册表[文件夹路径]['vite'] = vite中间件
                    console.log(文件夹路径, '的开发服务在:', 'http://127.0.0.1:' + port, '上启用')
                    if (require('fs').existsSync(文件夹路径 + '/backend/index.js')) {
                            let router = require(文件夹路径 +'/backend/index.js')
                            app.use(router)
                            app.use(vite中间件.middlewares)
                    }
                })/*.then(
                    s => { 
                        let {address,port} =  server.httpServer.address()
                        console.log(文件夹路径,'的开发服务在:','http://'+address+':'+port,'上启用') 
                        vite服务注册表[文件夹路径]['port'] = port
                        console.log(server)
                    }
                )*/
                console.log(vite中间件.middlewares)
                resolve(server)
            }
        })
    }
}
