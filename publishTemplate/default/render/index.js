import { 获取全部原始数据 } from "../../../noob-service-syPublishServer/server/util/pipe.js"
import {生成文档大纲} from './outline.js'
import {生成文档树根节点} from './filetree.js'
function 渲染页面内容(document) {
    let 页面数据 = 获取全部原始数据(document)
    document.getElementById('publish-content').innerHTML = 页面数据.content
    document.querySelectorAll('.protyle-wysiwyg.protyle-wysiwyg--attr [data-node-id]').forEach(
        el=>el.setAttribute('id',el.getAttribute('data-node-id'))
    )
}
function 禁用编辑(document) {
    document.getElementById('publish-content').querySelectorAll(`[contenteditable]`).forEach(
        element => { element.setAttribute('contenteditable', false) }
    )
}
function 修改块链接(document) {
    document.head.insertAdjacentHTML('beforeend', '<style>span a{color:inherit !important}</style>')
    document.querySelectorAll('span[data-type="block-ref"]').forEach(
        块链接 => {
            let 锚文本 = 块链接.innerText
            块链接.innerHTML = `<a href='/${块链接.getAttribute('data-id')}'>${锚文本}</a>`
        }
    )
}
function 修改超链接(document) {
    document.querySelectorAll('span[data-type="a"]').forEach(
        块链接 => {
            let 锚文本 = 块链接.innerText
            块链接.innerHTML = `<a href='${块链接.getAttribute('data-href')}'>${锚文本}</a>`
        }
    )
}
function 添加页脚(document) {
    document.getElementById('status').insertAdjacentHTML('beforeend', `
    <div fn__flex style='width:30%'></div>
    <div class="fn__flex  fn__flex-1" style='text-align:center;margin:auto' >
       <div> poweredBy <a href='https://b3log.org/siyuan/' target='_blank'>siyuan@${window.siyuan.config.system.kernelVersion}</a> with <a target='_blank' href='https://www.chuanchengsheji.com'>noob </a></div>
       <div> 
        <a href='https://afdian.net/a/leolee9086'>请noob作者喝一杯咖啡</a>
        </div>

       </div>
       <div fn__flex style='width:30%'></div>
    `)
}
export let 渲染管线 = [
    渲染页面内容, 
    禁用编辑, 
    修改块链接, 
    修改超链接, 
    添加页脚,
    生成文档大纲,
    生成文档树根节点
]