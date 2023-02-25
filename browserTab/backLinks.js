import noobApi from "../noobApi/index.js"
const 核心api = noobApi.核心api
const BlockListEditor =  noobApi.编辑器.BlockListEditor
class BacklinksEditor  {
    constructor(element,key){
        this.element= element
        this.element.innerHTML = ''
        this.element.classList.add('fn__flex-1')
        this.查找反向链接(key)
    }
    async 查找反向链接(key){
        if(!key){
            this.element.innerHTML='未找到相关内容'
        }
        let blocks =  await 核心api.fullTextSearchBlock({
            path:'',
            query:key,
            "types":{"document":true,"heading":true,"list":true,"listItem":true,"codeBlock":true,"htmlBlock":true,"mathBlock":true,"table":true,"blockquote":true,"superBlock":true,"paragraph":true}
        })
        if(blocks.blocks.length==0){
            this.element.innerHTML='未找到相关内容'
        }
        else{
            console.log(blocks.blocks)
            new BlockListEditor(this.element,blocks.blocks)
        }
    }
}

export default BacklinksEditor 