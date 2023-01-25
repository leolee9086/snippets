import noobApi from "../../../noobApi/index.js";
import { 解析ial字符串 } from "../authentic/attribute.js";
import { 获取所有发布范围文档属性 } from "../authentic/attribute.js";
import { 是否下级路径 } from "../authentic/block.js";

export async function 获取全文档数据(){
    let 全文档数据 =await  noobApi.核心api.sql({stmt:`select * from blocks where type = 'd'`})
    return 全文档数据
}
export async function 获取可发布文档数据(){
    let 全文档数据 = await 获取全文档数据()
    let 路径排序全文档数据 = 全文档数据.sort(
        (数据1,数据2)=>{
            return 数据1.path.length-数据2.path.length
        }
    )
    for(let i=0,len = 路径排序全文档数据.length;i<len;i++){
         let 文档数据 = 路径排序全文档数据[i]
         文档数据.ial=解析ial字符串(文档数据.ial)
    }
    for(let i=0,len = 路径排序全文档数据.length;i<len;i++){
        let 文档数据 = 路径排序全文档数据[i]
        if(!文档数据.ial['custom-publish-access']){
            文档数据.ial['custom-publish-access']='private'
        }
        if(文档数据.ial['custom-publish-access']=='private'){
            ['name','alias','memo','content','fcontent','markdown'].forEach(
                属性名 =>文档数据[属性名]='不可访问此文档'
                
            )
            文档数据.ial = {'custom-publish-access':'private'}
        }
        for(let j=i+1,len = 路径排序全文档数据.length;j<len;j++){
            let  后继文档数据 = 路径排序全文档数据[j]
            if(是否下级路径(后继文档数据.path,文档数据.path)){
                if(!后继文档数据.ial['custom-publish-access']||后继文档数据.继承上级文档){
                    后继文档数据.ial['custom-publish-access']=文档数据.ial['custom-publish-access']
                    后继文档数据.继承上级文档 = true
                }
            }
        }
   }
   return 路径排序全文档数据
}
