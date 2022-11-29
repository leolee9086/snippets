export default class 页面控制器{
    constructor(页面容器,地址栏容器,标题容器,前进按钮,后退按钮,重载按钮){
        this.页面容器= 页面容器
        this.地址栏容器= 地址栏容器
        this.前进按钮 = 前进按钮
        this.后退按钮 = 后退按钮
        this.标题容器 = 标题容器
        this.重载按钮 = 重载按钮
        this.页面状态 = {
            历史记录数组:[],
            当前历史序号:0,
        }
        this.绑定事件()
    }
    绑定事件(){
        this.地址栏容器.addEventListener('change',()=>{
            this.加载URL(this.地址栏容器.value)
        })
        this.前进按钮.addEventListener('click',()=>{
            this.移动历史(1)
        })
        this.后退按钮.addEventListener('click',()=>{
            this.移动历史(-1)
        })
        this.页面容器.addEventListener('will-navigate', (e) => {
            e.preventDefault()
            const protocol = (new URL(e.url)).protocol
            if (protocol === 'http:' || protocol === 'https:'|| protocol === 'file:') {
                this.页面容器.src = (e.url)
            }
        })
        this.页面容器.addEventListener('page-title-updated', async (e) => {
            this.tilte = e.title
            this.标题容器.innerHTML = e.title
        })
        this.重载按钮.addEventListener('click',()=>{
            this.重新加载()
        })
    }
    重新加载(){
        this.加载历史(this.页面状态.当前历史序号)
    }
    修正协议(url){
        console.log(url)
        if(url.startsWith("http://")||url.startsWith("https://")||url.startsWith("file://")){
            return url
        }
        else {
            return 'https://'+url
        }
    }
    加载URL(url){
        url = this.修正协议(url)
        this.页面状态.历史记录数组.push(url)
        this.移动历史(1)
    }
    移动历史(步数){
        let 页面状态 = this.页面状态
        if(页面状态.当前历史序号+步数>=页面状态.历史记录数组.length-1){
             this.加载历史(页面状态.历史记录数组.length-1)
        }
        else if(页面状态.当前历史序号+步数<0){
            this.加载历史(0)
        }
    }
    async 加载历史(历史序号){
        let url = this.页面状态.历史记录数组[历史序号]
        this.页面容器.setAttribute('src',url)
        this.地址栏容器.value!==url?this.地址栏容器.value=url:null
    }
    加载文件(文件路径){
        //如果没有指定file协议,就加上file协议
        if(!文件路径.startsWith('file://')){
            文件路径 = 'file://'+文件路径 
        }
        this.加载URL(文件路径)
    }
}