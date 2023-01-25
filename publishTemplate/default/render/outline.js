import { 获取全部原始数据 } from "../../../noob-service-syPublishServer/server/util/pipe.js";
function 生成面板(){
    let html =`
    <div class="fn__flex fn__flex-1" style="min-height: 64px; transition: var(--b3-width-transition); height: 652px;">
        <div data-type="wnd" data-id="" class="fn__flex-column fn__flex fn__flex-1">
            <ul class="fn__flex layout-tab-bar"></ul>
            <div class = "layout-tab-container fn__flex-1">
                <div class="fn__flex-1 fn__flex-column file-tree sy__outline">
                    <div class="block__icons">
                        <div class="block__logo">
                            <svg><use xlink:href="#iconAlignCenter"></use></svg>
                            大纲
                        </div>                    
                    </div>
                </div> 
            </div>
        </div>
    </div>
    `
    return html
    
}
export  function 生成文档大纲(document) {
   let 大纲内容 =  获取全部原始数据(document).docOutline
   let html = 渲染大纲(大纲内容, document);
   let 大纲面板html = 生成面板()
   document.getElementById('panelLeft').innerHTML+=大纲面板html
   document.getElementById('panelLeft').querySelector('.sy__outline').innerHTML +=html
}
 function  渲染大纲(大纲内容, document) {
    let 文档条目 = `
        <div class="b3-list-item" title="${获取全部原始数据(document).docInfo.name.replace(
          ".sy",
          ""
        )}">
        <span class="b3-list-item__graphic">
        <svg class="custom-icon">
        <use xlink:href="#icon-1f4c4"></use>
        </svg>
        </span>
        <span class="b3-list-item__text">${获取全部原始数据(document).docInfo.name.replace(
          ".sy",
          ""
        )}</span>
        </div>`;
    let 大纲容器 = `<div clas=fn__flex-1>
            <ul class="b3-list b3-list--background">
                ${渲染大纲条目内容(大纲内容, document)}
            <ul>
        </div>
        
        `;
    return 文档条目 + 大纲容器;
  }
  function  渲染大纲条目内容(大纲内容, document) {
    let html = "";
    大纲内容.forEach((大纲条目) => {
      html += `
<li 
class="b3-list-item b3-list-item--hide-action" 
data-node-id="${大纲条目.id}" 
data-ref-text="" 
data-def-id="" 
data-type="NodeHeading" 
data-subtype="${大纲条目.subType}" 
data-treetype="outline" 
data-def-path="">
    <span style="padding-left: ${
      16 * parseInt(大纲条目.subType[1])
    }px" class="b3-list-item__toggle">
        <svg data-id="${
          大纲条目.id
        }" class="b3-list-item__arrow fn__hidden b3-list-item__arrow--open">
        <use xlink:href="#iconRight"></use></svg>
    </span>
    <svg data-defids="[&quot;&quot;]" class="b3-list-item__graphic popover__block" data-id="${
      大纲条目.id
    }">
        <use xlink:href="#icon${大纲条目.subType.toUpperCase()}"></use>
    </svg>
    <span class="b3-list-item__text" title="${大纲条目.name||大纲条目.content}"><a href="#${
        大纲条目.id
      }">${大纲条目.name||大纲条目.content}</a></span>    
</li>
            `;
      if (大纲条目.blocks) {
        html += `<ul class>${渲染大纲条目内容(
          大纲条目.blocks,
          document
        )}</ul>`;
      }
      
    });
    return html;
  }