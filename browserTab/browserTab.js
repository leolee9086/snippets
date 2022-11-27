import noobApi from '../noobApi/index.js'
let { Tab, 注册自定义tab } = noobApi.layouts
let { 核心api } = noobApi
class iframeTab extends Tab {
    constructor(option) {
        let panel = `
        <div class="fn__flex fn__flex-1  fn__flex-column">    
            <div class="fn__flex" style="padding: 4px 8px;position: relative">
                <span style="opacity: 1" class="block__icon fn__flex-center btnBack" data-menu="true">
                    <svg><use xlink:href="#iconLeft"></use></svg>
                </span>
                <span style="opacity: 1" class="block__icon fn__flex-center btnForward" data-menu="true">                 
                <svg ><use xlink:href="#iconRight"></use></svg>
                </span>
                <div class="fn__space"></div>
                <input class="b3-text-field fn__flex-1">
                <span class="fn__space"></span>
                <span 
                style="opacity: 1" 
                class="block__icon fn__flex-center b3-tooltips b3-tooltips__w reload" 
                aria-label="刷新">
                    <svg><use xlink:href="#iconRefresh"></use></svg>
                </span>
                <span 
                style="opacity: 1" 
                class="block__icon fn__flex-center b3-tooltips b3-tooltips__w debug fn__none" 
                aria-label="反向链接">
                    <svg><use xlink:href="#iconLink"></use></svg>
                </span>
                <div id="searchHistoryList" data-close="false" class="fn__none b3-menu b3-list b3-list--background" style="position: absolute;top: 30px;max-height: 50vh;overflow: auto"></div>
            </div>   

            <div class="fn__flex fn__flex-1  naive_ifrmeContainer" style="max-height:100%" >
            <webview   
                class="fn__flex-1" 
                style=" max-height:calc(100% - 200px)" 
                src="${option.url}" data-src="" border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true"
                allowpopups="true"
                ></webview  >   
                <div class="fn__flex fn__flex-column browserBakclink" style="width:20%">
                <div class="block__icons block__icons--active">
                    <div class="block__logo">
                                            <svg><use xlink:href="#iconLink"></use></svg>
                                            反向链接
                                        </div>
                        <span class="counter listCount fn__none">1</span>
                        <span class="fn__space"></span>
                        <label class="b3-form__icon b3-form__icon--small search__label">
                            <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
                            <input class="b3-text-field b3-text-field--small b3-form__icon-input" placeholder="Enter 搜索">
                        </label>
                        <span class="fn__space"></span>
                        <span data-type="refresh" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="刷新"><svg class=""><use xlink:href="#iconRefresh"></use></svg></span>
                        <span class="fn__space"></span>
                        <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="最小化 Ctrl+W"><svg><use xlink:href="#iconMin"></use></svg></span>
                    </div>
                    <div class="backlinkList fn__flex-1">
                        <ul class="b3-list b3-list--background">
                            <li class="b3-list--empty">暂无相关内容</li>
                        </ul>
                    </div>
                    <div style='text-align:center'><span ><a style="color:var(--b3-theme-surface-lighter)" href='http://publish.chuanchengsheji.com/'>作者的网站在这里</a><span></div>
                </div>
            </div>
        </div>
    </div>
    `

        super({
            panel,
            title: option.title || '',
            icon: "naiveBrowser",
            type: "iframeTab",
            data: { url: option.url, title: option.title || '' }
        })
        this.urlInputter = this.panelElement.querySelector("input")
        this.urlInputter.value = option.url
        this.frame = this.panelElement.querySelector("webview")
        if(!window.require){
            this.frame.outerHTML =
                `
                <iframe   
                class="fn__flex-1" 
                style=" max-height:calc(100% - 200px)" 
                src="${option.url}" data-src="" border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true"
                allowpopups="true"
                ></iframe  >   

                `
                this.frame=this.panelElement.querySelector('iframe')
                this.frame.reload =()=>{ this.frame.setAttribute("src",this.frame.getAttribute('src'))}
        }

        this.devButton = this.panelElement.querySelector(".debug")
        this.minimalButton = this.panelElement.querySelector('[data-type="min"]')
        this.backlinkListElement = this.panelElement.querySelector(".backlinkList .b3-list--background")
        this.history={
            stack:[this.urlInputter.value],
            index:0
        }
        this.挂载事件()
        this.findBacklinks()

    }
    挂载事件() {
        this.浏览记录 = []
        this.urlInputter.addEventListener("change", () => {
            console.log(this.frame)
            if (!this.urlInputter.value.startsWith("http://") && !this.urlInputter.value.startsWith("https://") && !this.urlInputter.value.startsWith("/")) {
                this.urlInputter.value = "https://" + this.urlInputter.value
            }
            this.tilte = ""
            this.frame.setAttribute("src", this.urlInputter.value)
            this.tilte = this.urlInputter.value
            document.querySelector(`li[data-id="${this.id}"] span.item__text`).innerHTML = this.urlInputter.value
            this.data = { url: this.urlInputter.value ,title:this.tilte}
            this.history.stack.push(this.urlInputter.value)
            this.history.index+=1
            this.save()
            this.findBacklinks()
        })
        document.addEventListener('mousedown',()=>{this.showOverlay()}, true)
        document.addEventListener('mouseup',()=>{this.hideOverlay()}, true)
        this.bindButtonEvent()
        this.bindframeEvent()
    }
    hideOverlay(){
        this.panelElement.querySelector('.ovelayer').remove()
    }
    showOverlay() {
        if(!this.panelElement.querySelector('.ovelayer')){
        let div = document.createElement('div')
        div.setAttribute('style', `position:absolute;top:0;left:0;height:100%;width:80%`)
        div.setAttribute('class',"ovelayer")
        this.panelElement.appendChild(div)
        }
    }

    findBacklinks() {
        let url = this.urlInputter.value
        let { backlinkListElement } = this
        let stmt = `select * from spans`
        核心api.sql({ stmt: stmt }, '', (data) => {
            let backlinkList = data.filter(item => {
                return /\[[\s\S]*?\]\([\s\S]*?\)/gm.test(item.markdown) && item.markdown.indexOf(`(${url})`) > 0
            })
            backlinkListElement.innerHTML = ""
            backlinkList.forEach(
                item => {
                    backlinkListElement.innerHTML += `<li class="b3-list-item" draggable="true" data-node-id="20201225220955-bdl9x01" data-treetype="backlink" data-type="NodeListItem" data-subtype="u">
                    <span style="padding-left: 16px" class="b3-list-item__toggle">
                        <svg data-id="%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%981" class="b3-list-item__arrow fn__hidden"><use xlink:href="#iconRight"></use></svg>
                    </span>
                    <svg class="b3-list-item__graphic popover__block" data-id="20201225220955-bdl9x01"><use xlink:href="#iconListItem"></use></svg>
                    <span class="b3-list-item__text"><a href="siyuan://blocks/${item.block_id}/">${item.content}</a></span>
                    
                </li>`
                }
            )
        })
    }
    bindButtonEvent() {
   
        
        this.devButton.addEventListener('mousedown', () => {
            this.panelElement.querySelector(".browserBakclink").classList.remove("fn__none")
            this.devButton.classList.add("fn__none")
        },true)
        this.panelElement.querySelector('.reload').addEventListener('mousedown', () => {
            this.frame.reload()
        },true)
        this.minimalButton.addEventListener('mousedown',()=>{
            this.panelElement.querySelector(".browserBakclink").classList.add("fn__none")
            this.devButton.classList.remove("fn__none")
        },true)
        this.panelElement.querySelector('.btnForward').addEventListener(
            'mousedown',()=>{
                if(this.history.index<this.history.stack.length-1){
                    this.history.index+=1
                    this.urlInputter.value = this.history.stack[this.history.index]
                    this.frame.setAttribute('src',this.urlInputter.value)
                    this.data = { url: this.urlInputter.value ,title:this.tilte}
                    this.save()
                }
            }
        )
        this.panelElement.querySelector('.btnBack').addEventListener(
            'mousedown',()=>{
                if(this.history.index>0){
                    this.history.index-=1
                    this.urlInputter.value = this.history.stack[this.history.index]
                    this.frame.setAttribute('src',this.urlInputter.value)
                    this.data = { url: this.urlInputter.value ,title:this.tilte}
                    this.save()
                }
            }
        )
    }
    bindframeEvent() {
        let { frame, urlInputter } = this
        this.findBacklinks()
        frame.addEventListener("dom-ready", () => {
            fetch(urlInputter.value).then(
                res => {
                    return res.text()
                }
            ).then(
                text => {
                    let tilte = text.match(/<title>(.*?)<\/title>/);
                    if (tilte) {
                        this.tilte = tilte
                        document.querySelector(`li[data-id="${this.id}"] span.item__text`).innerHTML = tilte
                    }
                }
            )
        })
        frame.addEventListener('will-navigate', (e) => {
            e.preventDefault()
            const protocol = (new URL(e.url)).protocol
            if (protocol === 'http:' || protocol === 'https:') {
                frame.src = (e.url)
            }
        })

        frame.addEventListener('page-title-updated', async (e) => {
            this.tilte = e.title
            document.querySelector(`li[data-id="${this.id}"] span.item__text`).innerHTML = e.title
        })
    }
}
注册自定义tab("iframeTab", iframeTab)
export default iframeTab