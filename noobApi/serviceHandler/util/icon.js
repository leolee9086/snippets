const fs = require('fs')
const {app} = require('@electron/remote')

export function 校验图标(服务文件位置){
    let icon
    if (fs.existsSync(path.join(服务文件位置, "favicon.png"))) {
        icon = path.join(服务文件位置, "favicon.png")
    } else if (fs.existsSync(path.join(服务文件位置, "favicon.ico"))) {
        icon = path.join(_path, "favicon.ico")
    } else if (fs.existsSync(path.join(服务文件位置, "favicon.svg"))) {
        icon = path.join(_path, "favicon.svg")
    } else {
        icon = path.join(appDir, 'stage', 'icon-large.png')
    }
    return icon
}