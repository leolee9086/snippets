import noobApi from "../noobApi/index.js";
const {注册自定义题图按钮} =  noobApi.编辑器
 class  moreBackground   {
    constructor(){
        let 头图按钮配置1 = {
            id:"小歪",
          type:"小歪",
          label:"小歪",
          回调函数:(event)=>this.获取小歪图片(event),
          图标:"#iconImage"
        }
        注册自定义题图按钮(头图按钮配置1)
        let 头图按钮配置2 = {
            id:"acg",

          type:"acg",
          label:"小筑",
          回调函数:(event)=>this.获取acg图片(event),
          图标:"#iconImage"
        }
        注册自定义题图按钮(头图按钮配置2)
    }
    获取文档id(目标){
        if(目标.getAttribute('data-node-id')){
            return 目标.getAttribute('data-node-id')
        }
        else {
            return this.获取文档id(目标.parentElement)
        }
    }
    async 获取acg图片(event){
      event.preventDefault();
  
      let 文档id =this.获取文档id(event.target)
      let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
      let img = await fetch("https://img.xjh.me/random_img.php?return=302")
      let  imgurl = img.url
      头图元素组.forEach(
        el=>{
          el.setAttribute("style","")
          el.setAttribute("src",imgurl)
          }
      )
      noobApi.核心api.setBlockAttrs(
        {
          id:文档id,
          attrs:{
            "title-img":`background-image:url(${imgurl})`
          }
        }
      )

    }
    async 获取小歪图片(event){
      event.preventDefault();
  
      let 文档id = this.获取文档id(event.target)
      let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
      console.log(文档id)
      let img = await fetch("https://api.ixiaowai.cn/api/api.php")
      console.log(img)
      let  imgurl = img.url
      头图元素组.forEach(
        el=>{
          el.setAttribute("style","")
          el.setAttribute("src",imgurl)
          }
      )
      noobApi.核心api.setBlockAttrs(
        {
          id:文档id,
          attrs:{
            "title-img":`background-image:url(${imgurl})`
          }
        }
      )
    
    }
}
new moreBackground()