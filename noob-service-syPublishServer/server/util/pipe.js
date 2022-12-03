const fs = require('fs')
export function 获取全部原始数据(document){
    let 代码形式原始数据 = document.getElementById('metadata').innerHTML.replace('window.metadata=','')
    return JSON.parse(代码形式原始数据)
}
export function 设置原始数据属性值(属性名,属性值,document){
    let 原始数据 = 获取原始数据(document)
    原始数据[属性名]=属性值
    渲染结果.getElementById('metadata').innerHTML='window.metadata='+JSON.stringify(原始数据)
}
export function 初始化原始数据(原始数据,document){
    document.getElementById('metadata').innerHTML='window.metadata='+JSON.stringify(原始数据)
}

export function 生成管线渲染器(渲染管线,模板路径,原始数据生成器){
    return async(req,res)=>{
        //这里是告诉浏览器,我返回的是一个html页面
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        let 渲染结果 = new DOMParser().parseFromString(fs.readFileSync(模板路径), "text/html");
        if(!渲染结果.getElementById('metadata')){
            渲染结果.head.insertAdjacentHTML('afterbegin',`<script>${获取全部原始数据.toString()}${设置原始数据属性值.toString()}</script>`)

            渲染结果.head.insertAdjacentHTML('afterbegin','<script id="metadata" data-render-status></script>')
        }
        await 原始数据生成器(req,res,渲染结果)
        for await(let 渲染函数 of 渲染管线){
            await 渲染函数(渲染结果)
            if(渲染结果.getElementById('metadata').getAttribute('data-render-status') ){
                switch (渲染结果.getElementById('metadata').getAttribute('data-render-status')){
                //根据renderStatus,来决定下一步做什么,这里先只做渲染完成之后的处理
                    case 'ended':
                    break                    
                }
                break
            }
        }
        res.end(渲染结果.documentElement.innerHTML)
    }
}
