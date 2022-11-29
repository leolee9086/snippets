import { Protyle } from "../util/Protyle.js";
import { 生成单个dom元素 } from "../../util/dom.js";
export class BlockListEditor{
    constructor(Element,BlockList){
        this.Element = Element
        BlockList.forEach((block,index) => {
            this.initProtyle(block,index)
        });
    }
    initProtyle(block,index){
        let div = 生成单个dom元素(`
        <div data-block-id="${block.id}" class='fn__flex fn__flex-column'><div>
        `)
        this.Element.appendChild(div)
        let editor = new Protyle(
            div,{
                blockId: block.id,
                defId: "",
                action: 'cb-get-all',
                render: {
                    gutter: true,
                    breadcrumbDocName: true,
                    breadcrumbContext: true
                },
                typewriterMode: false,
                after: (editor) => {
                    /*if (window.siyuan.config.readonly || window.siyuan.config.editor.readOnly) {
                        disabledProtyle(editor.protyle);
                    }
                    editorElement.addEventListener("mouseleave", () => {
                        hideElements(["gutter"], editor.protyle);
                    });*/
                }
            }
        )
    }
}