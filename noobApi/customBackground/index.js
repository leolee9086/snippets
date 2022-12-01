export default function 添加自定义随机背景图(){
    async function 生成随机背景链接() {
        let 请求响应 = await fetch('/snippets/assets/backgrounds/')
        let 临时dom = new DOMParser().parseFromString(await 请求响应.text(), "text/html")
        let 图片链接数组 = 临时dom.querySelectorAll('a')
        let 随机链接 = 图片链接数组[Math.floor(Math.random() * 图片链接数组.length)].getAttribute("href")
        随机链接 = "/snippets/assets/backgrounds/" + 随机链接
        return 随机链接
    }
    document.addEventListener('contextmenu', 更换随机背景图)
    async function 更换随机背景图(event, 元素) {
        let 触发目标 = event.target
        if (元素) {
            触发目标 = 元素
        }
        if (触发目标.tagName == 'svg' || 触发目标.tagName == 'use') {
            更换随机背景图(event, 触发目标.parentElement)
            return
        }
        if (触发目标.classList.value == "protyle-icon b3-tooltips b3-tooltips__sw") {
            let 随机链接 = await 生成随机背景链接()
            触发目标.parentElement.parentElement.querySelector('img').setAttribute("style", '')
            触发目标.parentElement.parentElement.querySelector('img').setAttribute("src", 随机链接)
            fetch('/api/attr/setBlockAttrs',
                {
                    method: 'post',
                    body: JSON.stringify({
                        id: 触发目标.parentElement.parentElement.parentElement.getAttribute("data-node-id"),
                        attrs: { 'title-img': `background-image:url(${随机链接})` }
                    })
                }
            )
        }
    }
}
let 自定义题图按钮 = []
export function 注册自定义题图按钮(按钮选项){
    
    自定义题图按钮.push(按钮选项)
}
function 注入全部题图按钮(){
    let 题图按钮数组 = document.querySelectorAll('.protyle-background__img .protyle-icons')
    题图按钮数组.forEach(
        题图按钮组=>{
            注入题图按钮(题图按钮组)
        }
    )
}
function 注入题图按钮(按钮组){
    自定义题图按钮.forEach(
        按钮配置=>{
            try{
            if(按钮组.querySelector(`[data-type='random']`)&&!按钮组.querySelector(`[data-item-id=${按钮配置.id}]`)){
                生成题图按钮(按钮配置,按钮组)
            }
            }catch(e){
                console.error(e)
            }
        }
    )
}
function 生成题图按钮(按钮配置,按钮组){
    let span =document.createElement("span");
    span.setAttribute("class", "protyle-icon b3-tooltips b3-tooltips__sw ");
    span.setAttribute("data-item-id", 按钮配置.id);
    span.setAttribute("aria-label", 按钮配置.label);
    span.setAttribute("style", "relative");
    span.addEventListener("click", 按钮配置.回调函数);
    span.innerHTML = `<svg><use xlink:href="${按钮配置.图标}"></use></svg>`;
    let 随机按钮 = 按钮组.querySelector(
      "[aria-label='上下拖动图片以调整位置']"
    );
    按钮组.insertBefore(span, 随机按钮);
}
setInterval(注入全部题图按钮,300)

