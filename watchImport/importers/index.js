import 文件转换器 from './converters/index.js'
const fs=require('fs')
const path = require('path')
function 获取文件扩展名(文件路径){
    return path.extname(文件路径)
}

async function 获取文件markdown内容(文件路径){
    if(!fs.existsSync(文件路径)){
        console.warn('文件'+文件路径+'不存在,导入失败')
        return undefined
    }
    let 文件文本内容 = fs.readFileSync(文件路径,'utf-8')
    let 文件扩展名 = 获取文件扩展名(文件路径).replace('\.','')
    if(文件转换器[文件扩展名+'2md']){
        let 转换函数 = 文件转换器[文件扩展名+'2md']
        let markdown文件内容 =await 转换函数(文件文本内容,文件路径)
        return markdown文件内容
    }
}
export default 获取文件markdown内容