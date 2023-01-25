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
    }
    //pdf2md
    //epub2md
    //mobi2md
    //docx2md

}