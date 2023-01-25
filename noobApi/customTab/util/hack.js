import { 展平Layout } from "./Tab.js";
export let tab注册表= {}
export const hackLayout=()=>{
    let layouts = 展平Layout()
    layouts.forEach(
        layout=>{
            if(layout.docIcon&&layout.docIcon.indexOf('type:')){

                try {
                    let {type,data} = JSON.parse(layout.docIcon)
                    if(tab注册表[type]&&!layout.inited){
                        let customTab = tab注册表[type]
                        let tab = new  customTab(data)
                        tab.inited = true
                        layout.parent.addTab(tab)
                        layout.parent.removeTab(layout.id)
                    }
                }catch(e){
                  //console.error(e)
                }
            }
        }
    )
}
setInterval(hackLayout,500)
hackLayout()
