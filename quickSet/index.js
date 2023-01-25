import noobApi from '../noobApi/index.js'
noobApi.编辑器.自定义工具栏.注册自定义工具栏按钮({
    id: "快速设置",
    提示: "快速设置",
    图标: `#iconSettings`,
    点击回调函数:显示设置面板,
  });
function 显示设置面板(event){
    let 工具栏元素 = event.currentTarget.parentElement;
    let 按钮元素 = event.currentTarget;
    let 面板元素 = 工具栏元素.parentElement.querySelector(".protyle-hint");
    面板元素.innerHTML = "";
    插入设置按钮(面板元素,工具栏元素)
    面板元素.classList.remove("fn__none");
    面板元素.style.top = 工具栏元素.offsetTop + 36 + "px";
    面板元素.style.left = 工具栏元素.offsetLeft + 按钮元素.offsetLeft + "px";
    if (
      工具栏元素.offsetLeft + 按钮元素.offsetLeft + 610 >
      document.offsetWidth
    ) {
      面板元素.style.left = document.offsetWidth - 610 + "px";
    }
    面板元素.style.width = "600px";
    面板元素.style.maxHeight = "800px";

}
async function 增量设置块别名(块id,别名){
    let 原始属性 = await noobApi.核心api.getBlockAttrs({id:块id})
    let 旧别名 = 原始属性.alias
    if(旧别名){
        旧别名 = 旧别名+"\,"+别名
    }else{
        旧别名 =别名
    }
     noobApi.核心api.设置块属性({
        id:块id,
        attrs:{
            alias:别名
        }
     })

}
function 插入设置按钮(面板元素){
    let 块别名按钮 = noobApi.DOM工具.生成单个dom元素(
        `<button style="width: calc(100% - 16px)" 
        class="b3-list-item b3-list-item--two" 
        data-item-id="alias"
        >
            <div class="b3-list-item__first" style="margin-bottom: 4px">
            <svg class="b3-list-item__graphic popover__block" ">
                <use xlink:href="#iconA"></use>
            </svg>
            <span>设置为块别名</span>   
            </div>
        </button>`,
        {
            click:async()=>{
                let 块id  = noobApi.编辑器.自定义工具栏.工具栏状态.当前块元素.getAttribute('data-node-id')
                if(window.siyuan.ctrlIsPressed){
                    块id=noobApi.编辑器.自定义工具栏.工具栏状态.当前protyle.block.rootID
                }
                await 增量设置块别名(块id,noobApi.编辑器.自定义工具栏.工具栏状态.当前range.toString())
            }
        }
    )
    面板元素.appendChild(块别名按钮);
}