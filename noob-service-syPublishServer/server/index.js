import noobApi from '../../noobApi/index.js'
import { 代码片段路径 } from '../../noobApi/util/file.js'
import '../../noobApi/util/requireHacker.js'
import { 生成管线渲染器, 初始化原始数据} from './util/pipe.js'
import { 根据路径获取文档权限 } from './authentic/block.js'
import { 根据名称获取附件权限 } from './authentic/assets.js'
require.setExternalDeps(代码片段路径 + `/noob-service-syPublishServer/node_modules`)
const http = require('http')
const express = require('express')
const 发布应用 = express()
const 发布端口 = '81'
const fs = require('fs')
const { createProxyMiddleware } = require('http-proxy-middleware')

const 思源代理 = createProxyMiddleware({
    target: `http://127.0.0.1:6806`,
    changeOrigin: true,
})
发布应用.use('/', async (req, res, next) => {
    req.url == '/' ? res.redirect('/20200812220555-lj3enxa') : null
    next()
})
let 默认模板文件夹路径 = 代码片段路径 + 'publishTemplate/default'
let 默认模板路径 = 默认模板文件夹路径 + '/doc.html'

let 默认渲染管线 =生成管线渲染器( (await import (默认模板文件夹路径+'/render/index.js')).渲染管线,默认模板路径, 注入思源文档原始数据)
export async function 注入思源文档原始数据(req, res, 渲染结果) {
    let 块id = req.params.blockID
    let 页面内容数据 = await 获取文档内容(块id)
    let 大纲数据 = await noobApi.核心api.getDocOutline(
        { id: 块id },
    );
    let 文档属性 = await noobApi.核心api.getDocInfo(
        { id: 块id },
    );
      页面内容数据.docOutline = 大纲数据
      页面内容数据.docInfo = 文档属性
    //把所有的数据全都注入到这个元素里面去
    初始化原始数据(页面内容数据, 渲染结果)
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

发布应用.use('/appearance', 思源代理)

发布应用.use('/stage', express.static(代码片段路径 + 'publishTemplate/default/stage'))


async function 判定附件权限(req) {
    let 附件名称 = req.url.split('/').pop()
    return await 根据名称获取附件权限(附件名称)
}

发布应用.use('/assets', async (req, res, next) => {
    if (await 判定附件权限(req)) {
        next()
    }
    else {
        res.status('403')
        res.setHeader('Content-Type', "text/html;charset=utf-8");
        res.end('不可访问此附件')
    }
}, 思源代理)
发布应用.use('/stage', 思源代理)

//这个要放到后面
async function 判定文档权限(块id) {
    let 文档路径 = (await 获取文档内容(块id)).path
    let 文档权限 = await 根据路径获取文档权限(文档路径)
    console.log(文档权限)
    return (await 根据路径获取文档权限(文档路径)) == 'public'
}
发布应用.use('/:blockID', async (req, res, next) => {
    if (await 判定文档权限(req.params.blockID)) {
        next()
    } else {
        res.status('403')
        res.setHeader('Content-Type', "text/html;charset=utf-8");
        res.end('不可访问此文档')

    }
}, 默认渲染管线)

let 发布服务器 = http.createServer(发布应用);
发布服务器.listen(发布端口, () => {
    console.log("发布服务已经启动")

})

