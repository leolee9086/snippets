import noobApi from "../../../noobApi/index.js";
import { 根据路径获取文档权限 } from "./block.js";
export async function 根据名称获取附件属性(附件名称){
    let sql = `select * from assets where name ='${附件名称}'`
    return noobApi.核心api.sql({stmt:sql})
}
export async function 根据名称获取附件权限(附件名称){
    let 附件引用属性数组 = await 根据名称获取附件属性(附件名称)
    let 附件权限
    for await (let 附件属性 of 附件引用属性数组){
        if(await 根据路径获取文档权限(附件属性.docpath)=='public'){
            附件权限 = 'public'
        }
    }    
    return 附件权限
}