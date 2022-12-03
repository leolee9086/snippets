import noobApi from "../../../noobApi/index.js";
import { 获取所有发布范围文档属性 } from "./attribute.js";
export function 去扩展名(路径){
    return 路径.split('.')[0]
}
export function 是否下级路径(路径1,路径2){
    return 去扩展名(路径1).indexOf(去扩展名(路径2))>-1
}
export async function 根据路径获取文档权限(文档路径){
    let 发布范围属性数组 = await 获取所有发布范围文档属性()
    let 最近上级文档发布范围属性 = 发布范围属性数组.filter(
        文档数据=>{
            return 是否下级路径(文档路径,文档数据.path)
        }
    ).sort(
        (数据1,数据2)=>{
            return 数据2.path.length-数据1.path.length
        }
    )[0]
    console.log(最近上级文档发布范围属性)
    if(最近上级文档发布范围属性){
        return 最近上级文档发布范围属性.value
    }
    else{
        return null
    }
}


