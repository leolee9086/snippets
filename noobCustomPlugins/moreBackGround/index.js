import {Plugin,frontEndApi,kernelApi} from 'https://esm.sh/siyuan-noob@1.1.3' 
frontEndApi.DOMUtil.addIcon(
  {
    id: "iconUnsplash",
    content: `
    <path d="M320 288V0h384v288h-384z m384 160H1024V1024H0V448h320v288h384V448z" p-id="2167"></path>
    `
  }
)
export default class moreBcakground extends Plugin {
  constructor() {
    super();
    this.注册按钮();
  }
  注册按钮() {
    let 头图按钮配置1 = {
      id: "小歪",
      type: "小歪",
      label: "小歪",
      回调函数: (event) => this.获取小歪图片(event),
      图标: "#iconImage",
    };
    frontEndApi.editor.addBackgoundImageButton(头图按钮配置1);
    let 头图按钮配置2 = {
      id: "acg",
      type: "acg",
      label: "小筑",
      回调函数: (event) => this.获取acg图片(event),
      图标: "#iconImage",
    };
    frontEndApi.editor.addBackgoundImageButton(头图按钮配置2);
    let 头图按钮配置3 = {
      id: "Unsplash",
      type: "Unsplash",
      label: "Unsplash搜索图片",
      回调函数: (event) => this.获取unsplash头图(event),
      图标: "#iconUnsplash",
    };
    frontEndApi.editor.addBackgoundImageButton(头图按钮配置3);
    let 头图按钮配置4 = {
      id: "unsplashSearch",
      type: "unsplashSearch",
      label: "随机unsplash图片",
      回调函数: (event) => this.获取unsplash随机头图(event),
      图标: "#iconUnsplash",
    };
    frontEndApi.editor.addBackgoundImageButton(头图按钮配置4);

    //这后面的都是图片菜单
    /*let 标题相关图片配置 = {
      id: "随机标题相关图片",
      文字: "随机标题相关图片",
      图标: "#iconRefresh",
      点击回调函数: (event) => this.获取相关附件("title"),
    };
    图片菜单.注册自定义菜单项(标题相关图片配置);
    let 提示文本相关图片配置 = {
      id: "随机提示文本相关图片",
      文字: "随机提示文本相关图片",
      图标: "#iconRefresh",
      点击回调函数: (event) => this.获取相关附件("alt"),
    };
    图片菜单.注册自定义菜单项(提示文本相关图片配置);
    let unsplash标题相关 = {
      id: "随机标题unsplash相关图片",
      文字: "随机标题unsplash相关图片",
      图标: "#iconUnsplash",
      点击回调函数: (event) => this.获取unsplash相关图片("title"),
    };
    图片菜单.注册自定义菜单项(unsplash标题相关);
    let unsplash提示相关 = {
      id: "随机提示文本unsplash相关图片",
      文字: "随机提示文本unsplash相关图片",
      图标: "#iconUnsplash",
      点击回调函数: (event) => this.获取unsplash相关图片("alt"),
    };
    图片菜单.注册自定义菜单项(unsplash提示相关);*/
  }
  获取文档id(目标) {
    if (目标.getAttribute('data-node-id')) {
      return 目标.getAttribute('data-node-id')
    }
    else {
      return this.获取文档id(目标.parentElement)
    }
  }
  async 获取unsplash随机头图(event){
    event.preventDefault();
    let 文档id = this.获取文档id(event.target)
    await unsplashRandomCover(文档id)
  }
  async 获取unsplash头图(event) {
    event.preventDefault();
    let 文档id = this.获取文档id(event.target)
    let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
    let 文档属性 = await kernelApi.getDocInfo({ id: 文档id })
    let 关键词组 = 文档属性.name
    文档属性.ial.alias?关键词组=文档属性.ial.alias:null
    文档属性.ial.tags?关键词组=文档属性.ial.tags:null
    文档属性.ial['custom-imageTag']?关键词组=文档属性.ial['custom-imageTag']:null
    try {
      let 图片搜索结果 = await (await fetch(`https://unsplash.com/napi/search?query=${关键词组}&per_page=1000`)).json()
      if (图片搜索结果 && 图片搜索结果.photos.results[0]) {
        let 相关图片数组 = 图片搜索结果.photos.results
        let 随机链接 = 相关图片数组[Math.floor(Math.random() * 相关图片数组.length)].urls.full
        头图元素组.forEach(
          el => {
            el.setAttribute("style", "")
            el.setAttribute("src", 随机链接)
          }
        )
        kernelApi.setBlockAttrs(
          {
            id: 文档id,
            attrs: {
              "title-img": `background-image:url(${随机链接})`
            }
          }
        )
      }
    } catch (e) {

    }
  }
  async 获取unsplash相关图片(属性名) {
    let query = 图片菜单.菜单状态.图片容器.getAttribute(属性名) || ''

    try {
      let 图片搜索结果 = await (await fetch(`https://unsplash.com/napi/search?query=${query}&per_page=100`)).json()
      console.log(图片搜索结果)
      if (图片搜索结果 && 图片搜索结果.photos.results[0]) {
        let 相关图片数组 = 图片搜索结果.photos.results
        let 随机链接 = 相关图片数组[Math.floor(Math.random() * 相关图片数组.length)].urls.full
        图片菜单.菜单状态.图片容器.setAttribute('data-src', 随机链接)
        图片菜单.菜单状态.图片容器.setAttribute('src', 随机链接)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  async 获取相关附件(属性名) {
    let k = 图片菜单.菜单状态.图片容器.getAttribute(属性名) || ''
    let 相关图片数组 = await kernelApi.searchAsset({ k: k })
    if (相关图片数组[0]) {
      let 随机链接 = 相关图片数组[Math.floor(Math.random() * 相关图片数组.length)].path
      let 扩展名 = 随机链接.split('.').pop()
      if (-1 < ['png', 'jpg', 'svg', 'tiff', 'webp', 'gif'].indexOf(扩展名)) {
        图片菜单.菜单状态.图片容器.setAttribute('data-src', 随机链接)
        图片菜单.菜单状态.图片容器.setAttribute('src', 随机链接)
      }
    }
  }

  async 获取acg图片(event) {
    event.preventDefault();
    let 文档id = this.获取文档id(event.target)
    let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
    let img = await fetch("https://img.xjh.me/random_img.php?return=302")
    let imgurl = img.url
    头图元素组.forEach(
      el => {
        el.setAttribute("style", "")
        el.setAttribute("src", imgurl)
      }
    )
    kernelApi.setBlockAttrs(
      {
        id: 文档id,
        attrs: {
          "title-img": `background-image:url(${imgurl})`
        }
      }
    )

  }
  async 获取小歪图片(event) {
    event.preventDefault();
    let 文档id = this.获取文档id(event.target)
    let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
    console.log(文档id)
    let img = await fetch("https://api.ixiaowai.cn/api/api.php")
    console.log(img)
    let imgurl = img.url
    头图元素组.forEach(
      el => {
        el.setAttribute("style", "")
        el.setAttribute("src", imgurl)
      }
    )
    kernelApi.setBlockAttrs(
      {
        id: 文档id,
        attrs: {
          "title-img": `background-image:url(${imgurl})`
        }
      }
    )
  }
}
export let unsplashRandomCover =async (文档id)=>{
    let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
    console.log(文档id)
    let img = await fetch("https://source.unsplash.com/random")
    console.log(img)
    let  imgurl = img.url
    头图元素组.forEach(
      el=>{
        el.setAttribute("style","")
        el.setAttribute("src",imgurl)
        }
    )
    kernelApi.setBlockAttrs(
      {
        id:文档id,
        attrs:{
          "title-img":`background-image:url(${imgurl})`
        }
      }
    )

}