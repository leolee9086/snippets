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

