import { 代码片段路径 } from './util/file.js'
import './util/requireHacker.js'
require.setExternalDeps(代码片段路径 + `/noobApi/node_modules`)
const http = require('http')
const express = require('express')
const 发布应用 = express()
const 发布端口 = '80'
const fs = require('fs')
发布应用.use('/', async (req, res, next) => {
    console.log(req)
    req.url == '/' ? res.redirect('/20200812220555-lj3enxa') : null
    next()
})

let 默认模板路径 = 代码片段路径 + 'publishTemplate/default/doc.html'

async function 渲染页面内容(req, res, 渲染结果) {
    let 块id = req.params.blockID    
    let 页面数据 = await 获取文档内容(块id)
    渲染结果.getElementById('publish-content').innerHTML = 页面数据.content
    console.log(渲染结果)
    return 渲染结果
    
}

let 默认渲染管线 = 生成管线渲染器([渲染页面内容], 默认模板路径)
发布应用.use('/appearance',express.static(代码片段路径 + 'publishTemplate/default/appearance'))
发布应用.use('/stage',express.static(代码片段路径 + 'publishTemplate/default/stage'))

发布应用.use('/:blockID', 默认渲染管线)

let 发布服务器 = http.createServer(发布应用);
发布服务器.listen(发布端口, () => {
    console.log("发布服务已经启动")

})
async function 获取文档内容(块id) {
    let stmt = `select * from blocks where id in (select root_id from blocks  where id = "${块id}" )`
    let 文档数据 = (await noobApi.核心api.sql({ stmt: stmt }))[0]
    let 文档内容 = await noobApi.核心api.getDoc(
        {
            id: 文档数据.id,
            mode: 0,
            size: 102400
        }
    )
    return 文档内容
}



export function 生成管线渲染器(渲染管线, 模板路径) {
    return async (req,res) => {
        //这里是告诉浏览器,我返回的是一个html页面
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        let 渲染结果 = new DOMParser().parseFromString(fs.readFileSync(模板路径), "text/html");
        //这里是一个循环,不断地把渲染结果和请求喂给它们,所以渲染管线中的每一步也都可以跳出去,直接响应请求
        for await (let 渲染函数 of 渲染管线) {
            try {
                //如果渲染结果没有这个函数说明它不是数据了
                if (!渲染结果.querySelector) {
                    let tempdoc = new DOMParser().parseFromString(
                        渲染结果,
                        "text/html"
                    );
                    渲染结果 = tempdoc;

                }
                if (渲染结果.完成) {
                    return 渲染结果;
                }
                if (渲染函数 instanceof Function) {
                    渲染结果 = (await 渲染函数(req, res, 渲染结果)) || "";
                }
                let 文字渲染结果 = "";
                try {
                    文字渲染结果 = 渲染结果.querySelector("body").innerHTML;
                } catch (e) {
                    文字渲染结果 = 渲染结果;
                    let tempdoc = new DOMParser().parseFromString(
                        文字渲染结果,
                        "text/html"
                    );
                    渲染结果 = tempdoc;
                    console.error(e);
                }
            } catch (e) {
                console.error(e);
                continue;
            }
        }
        //如果有结果就返回结果
        try {
            if (渲染结果) {
                res.end(渲染结果.documentElement.innerHTML)
            }
            else {
                res.end('渲染出错,没有有效的结果')
            }
        } catch (e) {
            渲染结果 = null
            console.error(e)
        }
        //万一我们这里对它还有其他操作呢
        return 渲染结果
    }

}  