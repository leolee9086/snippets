
export function 监听文件修改(监听选项){
    const fs = require('fs')
    fs.watch(监听选项.监听路径,监听选项.监听配置,(type,fileName)=>{
        if(监听选项.事件类型.indexOf(type)>=0){
            let 扩展名 =  fileName.split('.').pop()
            if(监听选项.文件类型.indexOf(扩展名)>=0){
                window.location.reload()
            }
        }
    })
}
export let workspaceDir = window.siyuan?window.siyuan.config.system.workspaceDir:window.workspaceDir
export let snippetsDir = workspaceDir+'/data/snippets/'
export {workspaceDir as 工作空间路径}
export {snippetsDir as 代码片段路径}
