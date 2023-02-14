import 附件列表 from './replace/附件列表.js'
export let 重渲染配置表 = [
    附件列表,
    {
        判定函数:(sql, id)=>{return sql&&!sql.startsWith("SELECT * FROM blocks")},
        sql替换:(原始sql)=>{return 原始sql},
        字段过滤:(字段名数组,嵌入块sql,嵌入块id)=>{return 字段名数组.filter(item=>{return item!=='id'})},
        表头替换:(表头内容,嵌入块sql,嵌入块id)=>{
            let 属性名对照表 ={
                hpath:"可读路径",
                id:'块id',
            }
            if(属性名对照表[表头内容]){
                表头内容 = 属性名对照表[表头内容]
            }
            return 表头内容
        },
        表身替换:(表身内容,结果条目,嵌入块sql,嵌入块id)=>{return `<a href='siyuan://blocks/${结果条目.id}'>${表身内容}</a>`}
    },
]