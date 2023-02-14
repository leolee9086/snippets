
//样式元素
document.head.insertAdjacentHTML(
  "beforeEnd",
  `<style>
    [data-node-id]:has(.protyle-action-custom__drag.active), [data-node-id]:has(.protyle-action-custom__drag.active)>[data-node-id]{
        border:dashed 1px 
    }
    [data-node-id] .protyle-action-custom__drag{
        min-height: 20px;
        height:80%;
        width: 4px;
        background-color: var(--b3-theme-surface);
        border-radius: 4px;
        cursor: col-resize;
        transition: var(--b3-transition);
        position: absolute;
        top: 10%;
        right: -4px;
        box-shadow: 0 0 1px 1px var(--b3-theme-on-surface);
        box-sizing: border-box;
        z-index:300
    }
    </style>`
);
//在鼠标移动的时候计算抓手位置
document.addEventListener("mousemove", 显示抓手);
//当鼠标抬起就重置位置
document.addEventListener("mouseup", 隐藏抓手);

let 当前编辑块元素 = {};
let 开始缩放 = false;
function 隐藏抓手() {
  当前编辑块元素 = {};
  document
    .querySelectorAll(".protyle-action-custom__drag")
    .forEach((抓手) => 抓手.remove());
}
function 显示抓手(event) {
  let 属性元素组 = document.querySelectorAll(".protyle-gutters");
  let 当前id数组 = []
  属性元素组.forEach((块标) => {
    生成抓手(块标,当前id数组);
  });
  document.querySelectorAll('.protyle-action-custom__drag').forEach(
    抓手元素=>{
        if(当前id数组.indexOf(抓手元素.getAttribute('data-id'))<0&&!抓手元素.classList.contains("active")){
            抓手元素.remove()
        }
    }
  )

  if(当前编辑块元素.parentElement
    &&Array.from(当前编辑块元素.parentElement.querySelectorAll(`[data-node-id]`)).pop().getAttribute('data-node-id')
    ==当前编辑块元素.getAttribute('data-node-id')
    &&当前编辑块元素.parentElement.getAttribute("data-sb-layout")=="col"){
    当前编辑块元素=当前编辑块元素.parentElement
  }
  if (开始缩放) {
    if (当前编辑块元素 && 当前编辑块元素.style) {
      if (当前编辑块元素.style) {
        //计算出缩放后大小对应的比例
        let 计算比例 = ((event.clientX - 当前编辑块元素.getBoundingClientRect().left)/当前编辑块元素.parentElement.getBoundingClientRect().width)*100
        if(计算比例>=100){
            计算比例=100
        }
        let 吸附比例数组=[100,75,50,25,66,33]
        吸附比例数组.forEach(
            比例=>{
                if(Math.abs(计算比例-比例)<=5&&当前编辑块元素.parentElement.getBoundingClientRect().width>=100){
                    计算比例=比例
                }
            }
        )
        当前编辑块元素.style.width =计算比例+'%'
        当前编辑块元素.style.flex = "0 0 auto";
      }
    }
  }
}
function 生成抓手(块标,当前id数组) {
  let id元素组 = 块标.querySelectorAll("[data-node-id]");
  id元素组.forEach((id元素,i) => {
    if (id元素) {
      let 块id = id元素.getAttribute("data-node-id");
      当前id数组.push(块id)
      let 块元素 = 块标.parentElement.querySelector(
        `.protyle-wysiwyg [data-node-id="${块id}"]`
      );
      if (!块元素) {
        return;
      } else if (!块元素.querySelector(`.protyle-action-custom__drag[data-id="${块id}"]`)) {
        let 抓手元素 = document.createElement("span");
        抓手元素.className = "protyle-action-custom__drag";
        抓手元素.setAttribute('data-id',块id)
        let 最后一个属性元素 = Array.from(
          块元素.querySelectorAll(".protyle-attr")
        ).pop();
        块元素.insertBefore(抓手元素, 最后一个属性元素);
        //给抓手元素增加一个偏移,避免多层元素时,重叠
        抓手元素.style.left=`calc(100% - ${8*i}px)`
        抓手元素.addEventListener("mousedown", () => {
          抓手元素.classList.add("active");
          开始缩放 = true;
          当前编辑块元素 = 抓手元素.parentElement;
        });
      }
    }
  });
  
}
