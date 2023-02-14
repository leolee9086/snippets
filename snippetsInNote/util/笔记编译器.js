import noobApi from "../../noobApi/index.js"
export async function 编译笔记(id,语言,选项){
    let 笔记内容 = await noobApi.核心api.getDoc({id:id,size:102400})
    console.log(笔记内容.content)
    return 笔记内容.content
}