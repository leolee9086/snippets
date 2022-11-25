function getAllProtyles(){
    let protyles = []
    const getProtyle=(layout)=>{
        if(layout.model&&layout.model.editor&&layout.model.editor.protyle){
            protyles.push(layout.model.editor.protyle)
        }
        if(layout.children){
            layout.children.forEach(
                child=>getProtyle(child)
            )
        }
    }
    getProtyle(window.top.siyuan.layout.layout)
    return protyles
}
