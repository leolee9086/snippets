let fs = require('fs')
let path = require('path')
export let vite挂件目录 = window.siyuan.config.system.workspaceDir +'/data/viteWidgets'
export function 读取挂件列表(){
    let 挂件列表 =[]
    let 路径列表= require('fs').readdirSync(vite挂件目录)
    路径列表.forEach(
        路径名=>{
            if(fs.existsSync(path.join(vite挂件目录,路径名,'vite.config.js'))){
                挂件列表.push({
                    name:路径名,
                    path:path.join(vite挂件目录,路径名)
                })
            }
        }
    )
    return 挂件列表
}