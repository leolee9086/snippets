import noobApi from "../../../noobApi/index.js"
import readability from "./Readability.js"
export default {
    md2md(文本内容){
        return 文本内容
    },
    async html2md(文本内容){
        let temp = document.cloneNode(true)
        temp.querySelector('html').innerHTML = 文本内容
        const article = new readability(temp.cloneNode(true), {keepClasses: true,}).parse()
        const markdown = Lute.New().HTML2Markdown(article.content)

        return markdown[0]
    },
    //pdf2md
    //epub2md
    //mobi2md
    //docx2md
    async xml2md(文本内容){
        console.log(文本内容)
        let temp = (new DOMParser()).parseFromString(文本内容,"text/xml")
        console.log(temp)
        console.log(temp.querySelector('text'))
        console.log(temp.querySelector('text').textContent)
        let temp2 = new DOMParser().parseFromString(temp.querySelector('text').textContent,"text/html")
        const article = new readability(temp2.cloneNode(true), {keepClasses: true,}).parse()
        const markdown = Lute.New().HTML2Markdown(article.content)

        return markdown[0]

    }
}
