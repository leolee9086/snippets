import noobApi from '../../noobApi/index.js'
import { 代码片段路径 } from '../../noobApi/util/file.js'
import '../../noobApi/util/requireHacker.js'
import {生成管线渲染器,初始化原始数据,获取全部原始数据} from './util/pipe.js'
import { 根据路径获取文档权限 } from './authentic/block.js'
import { 根据名称获取附件权限 } from './authentic/assets.js'
require.setExternalDeps(代码片段路径 + `/noob-service-syPublishServer/node_modules`)
const http = require('http')
const express = require('express')
const 发布应用 = express()
const 发布端口 = '80'
const fs = require('fs')
发布应用.use('/', async (req, res, next) => {
    req.url == '/' ? res.redirect('/20200812220555-lj3enxa') : null
    next()
})

let 默认模板路径 = 代码片段路径 + 'publishTemplate/default/doc.html'
export async function 注入思源文档原始数据(req,res,渲染结果){
    let 块id = req.params.blockID    
    let 页面内容数据 = await 获取文档内容(块id)
    //把所有的数据全都注入到这个元素里面去
    初始化原始数据(页面内容数据,渲染结果)
}
function 渲染页面内容(document) {
    let 页面数据=获取全部原始数据(document)
    document.getElementById('publish-content').innerHTML = 页面数据.content
}

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
function 禁用编辑(document){
	document.getElementById('publish-content').querySelectorAll(`[contenteditable]`).forEach(
		element=>{element.setAttribute('contenteditable',false)}
	)
}
function 修改块链接(document){
    document.head.insertAdjacentHTML('beforeend','<style>span a{color:inherit !important}</style>')
    document.querySelectorAll('span[data-type="block-ref"]').forEach(
        块链接=>{
            let 锚文本 = 块链接.innerText
            块链接.innerHTML=`<a href='/${块链接.getAttribute('data-id')}'>${锚文本}</a>`
        }
    )
}
function 修改超链接(document){
    document.querySelectorAll('span[data-type="a"]').forEach(
        块链接=>{
            let 锚文本 = 块链接.innerText
            块链接.innerHTML=`<a href='${块链接.getAttribute('data-href')}'>${锚文本}</a>`
        }
    )
}
function 添加页脚(document){
    document.body.insertAdjacentHTML('beforeend',`
    <div style='text-align:center'>
       <div> poweredBy <a href='https://b3log.org/siyuan/' target='_blank'>siyuan@${window.siyuan.config.system.kernelVersion}</a> with <a target='_blank' href='https://www.chuanchengsheji.com'>noob </a></div>
       <div> <a href='https://afdian.net/a/leolee9086'>请noob作者喝一杯咖啡</a></div>
    </div>
    `)
}
let 默认渲染管线 = 生成管线渲染器([渲染页面内容,禁用编辑,修改块链接,修改超链接,添加页脚], 默认模板路径,注入思源文档原始数据)
发布应用.use('/appearance',express.static(代码片段路径 + 'publishTemplate/default/appearance'))
发布应用.use('/stage',express.static(代码片段路径 + 'publishTemplate/default/stage'))

const { createProxyMiddleware } = require('http-proxy-middleware')

const 思源代理 = createProxyMiddleware({
    target: `http://127.0.0.1:6806`,
    changeOrigin: true,
})
async function 判定附件权限(req){
    let 附件名称 = req.url.split('/').pop()
    return await 根据名称获取附件权限(附件名称)
}
发布应用.use('/assets',async (req,res,next)=>{
    if(await 判定附件权限(req)){
        next()
    }
    else {
        res.status('403')
        res.setHeader('Content-Type',"text/html;charset=utf-8" );
        res.end('不可访问此附件')
    }
},思源代理)
//这个要放到后面
async function 判定文档权限(块id){
    let 文档路径 = (await 获取文档内容(块id)).path
    let 文档权限 = await 根据路径获取文档权限(文档路径)
    console.log(文档权限)
    return (await 根据路径获取文档权限(文档路径))=='public'
}
发布应用.use('/:blockID',async(req,res,next)=>{
    if(await 判定文档权限(req.params.blockID)){
        next()
    }else{
        res.status('403')
        res.setHeader('Content-Type',"text/html;charset=utf-8" );
        res.end('不可访问此文档')

    }
},默认渲染管线)

let 发布服务器 = http.createServer(发布应用);
发布服务器.listen(发布端口, () => {
    console.log("发布服务已经启动")

})

