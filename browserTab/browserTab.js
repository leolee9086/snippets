import 核心api from '../noobApi/util/kernelApi.js'
import 页面控制器 from "./controller.js"
import {Tab} from '../noobApi/customTab/util/Tab.js'
import BacklinksEditor from './backLinks.js'
export  class BrowserTab extends Tab {
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
                class="block__icon fn__flex-center b3-tooltips b3-tooltips__w btnRefresh" 
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
                src="" data-src="" border="0" 
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
                            <span data-type="refresh" class="block__icon b3-tooltips b3-tooltips__sw " aria-label="刷新" ><svg class=""><use xlink:href="#iconRefresh"></use></svg></span>
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
            type: "BrowserTab",
            data: { url: option.url, title: option.title || '' }
        })
        this.title = option.title
        this.urlInputter = this.panelElement.querySelector("input")
        this.urlInputter.value = option.url
        this.frame = this.panelElement.querySelector("webview")
        if(!window.require){
            this.frame.outerHTML =
                `
                <iframe   
                class="fn__flex-1" 
                style=" max-height:calc(100% - 200px)" 
                src="" data-src="" border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true"
                allowpopups="true"
                ></iframe  >   

                `
                this.frame=this.panelElement.querySelector('iframe')
                this.frame.reload =()=>{ this.frame.setAttribute("src",this.frame.getAttribute('src'))}
        }
        this.backlinkListElement = this.panelElement.querySelector(".backlinkList .b3-list--background")
        this.页面控制器 = new 页面控制器(
            this.frame,
            this.urlInputter,
            this.headElement.querySelector(`span.item__text`),
            this.panelElement.querySelector('.btnForward'),
            this.panelElement.querySelector('.btnBack'),
            this.panelElement.querySelector('.btnRefresh')
        )
        this.页面控制器.加载URL(option.url)
        this.save()
        this.挂载事件()
        this.查找反向链接()
    }
    挂载事件() {
        document.addEventListener('mousedown',()=>{this.showOverlay()}, true)
        document.addEventListener('mouseup',()=>{this.hideOverlay()}, true)
    }
    hideOverlay(){
        this.panelElement.querySelector('.ovelayer').remove()
    }
    showOverlay() {
        if(!this.panelElement.querySelector('.ovelayer')){
        let div = document.createElement('div')
        div.setAttribute('style', `position:absolute;bottom:0;left:0;height:calc(100% - 200px);width:80%`)
        div.setAttribute('class',"ovelayer")
        this.panelElement.appendChild(div)
        }
    }
    async 查找反向链接(){ 
        this.backlinkListElement.innerHTML = '等待加载'
        let url = this.urlInputter.value
        
        this.反向链接编辑器 =   new BacklinksEditor(this.backlinkListElement,url)

    }
}
