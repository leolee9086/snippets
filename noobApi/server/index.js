import { 代码片段路径 } from './util/file.js'
import './util/requireHacker.js'
require.setExternalDeps(代码片段路径 + `/noobApi/node_modules`)
const http = require('http')
const express = require('express')
const 发布应用 = express()
const 发布端口 = '80'
发布应用.use('/', async (req, res, next) => {
    console.log(req)
    req.url == '/' ? res.redirect('/20200812220555-lj3enxa') : null
    next()
})
发布应用.use('/:blockID', async (req, res) => {
    console.log(req.params)
    let 块id = req.params.blockID
    let 页面数据 = await 渲染页面(块id)
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.end(页面数据.content)
})
let 发布服务器 = http.createServer(发布应用);
发布服务器.listen(发布端口, () => {
    console.log("发布服务已经启动")

})
async function 渲染页面(块id) {
    let stmt = `select * from blocks where id in (select root_id from blocks  where id = "${块id}" )`
    let 文档数据 = (await noobApi.核心api.sql({ stmt: stmt }))[0]
    let 文档内容 = await noobApi.核心api.exportPreview(
        {
            "id": 文档数据.id
        }
    )
    let 文档属性 = await noobApi.核心api.getDocInfo(
        {
            "id": 文档数据.id
        }
    )
    if (文档属性.ial && 文档属性.ial['custom-publish-access']) {
        let 发布数据 = {}
        发布数据.title = 文档属性.ial.title
        发布数据.markdown = 文档数据.markdown
        发布数据.content = 转换图片地址(文档内容)
        发布数据.desc = 文档属性.ial.memo
        发布数据.thumb = 文档属性.ial['title-img']
        return 发布数据
    } else {
        return {content:'<h1 style="font-size:200px;color:red">这个文档除了我自己谁都不准看</h1>'}
    }
}
function 转换图片地址(文档内容) {
    let div = document.createElement('div')

    div.innerHTML = '<meta charset="UTF-8">' + (文档内容.content ? 文档内容.content : 文档内容.html)

    div.querySelectorAll('[src]').forEach(
        el => {
            if (el.getAttribute('src').startsWith('assets')) {
                el.setAttribute('src', window.location.origin + '/' + el.getAttribute('src'))
            }
        }
    )
    div.innerHTML += '<p>本文使用<a href="https://b3log.org/siyuan/">思源笔记</a>写作</p>'
    div.innerHTML += '<p>本文使用<a href="http://publish.chuanchengsheji.com/">椽承设计</a><a href="https://github.com/leolee9086/snippets">小工具</a>配合发布</p>'
    return div.innerHTML
}
