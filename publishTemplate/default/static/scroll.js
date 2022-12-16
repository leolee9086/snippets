function 滚动到页面内元素(id) {
    let 页面内元素 = document.querySelector(`.protyle-wysiwyg.protyle-wysiwyg--attr [data-node-id='${id}']`)
    if (页面内元素) {
        页面内元素.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
        setTimeout(
            () => {
                let style = 页面内元素.getAttribute("style")
                页面内元素.style.border = "2.5px dashed var(--b3-card-info-color)"
                页面内元素.style.backgroundColor = "var(--b3-card-info-background)"
                setTimeout(
                    () => { 页面内元素.setAttribute("style", style) }, 1000
                )

            }, 50
        )
    }

}
document.addEventListener('click', (event) => {

    let target = event.target
    let href = target.getAttribute("href")
    if (href) {
        let id = href.split("/").pop().replace('#','')
        let reg = /^\d{14}\-[0-9a-z]{7}$/
        let 页面内元素 = document.querySelector(`.protyle-wysiwyg.protyle-wysiwyg--attr [data-node-id='${id}']`)
        if (reg.test(id) && 页面内元素) {
            event.stopPropagation()
            event.preventDefault()
            滚动到页面内元素(id)
        }
    }
})
window.addEventListener(
    "load", () => {
        let id = window.location.href.split("/").pop().replace('#','')
        let reg = /^\d{14}\-[0-9a-z]{7}$/
        if (reg.test(id)) {
            setTimeout(
                () => 滚动到页面内元素(id)
                , 1000
            )
        }
    }
)
