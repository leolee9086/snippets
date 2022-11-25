let 按钮注册表 = []
function 生成工具栏按钮元素(按钮配置) {
    let 临时容器 = document.createElement('div')
    临时容器.innerHTML = `
        <button 
            class="protyle-toolbar__item b3-tooltips b3-tooltips__n" 
            data-type="${按钮配置.类型}"
            data-item-id="${按钮配置.id}" 
            aria-label="${按钮配置.提示}"
        >
            <svg>
                <use xlink:href="${按钮配置.图标}"></use>
            </svg>
        </button>

	`
    //起个名字让它好记一点嘛
    let 按钮元素 = 临时容器.firstElementChild
    按钮元素.addEventListener("click", 按钮配置.点击回调函数)
    return 按钮元素
}
function 插入自定义按钮(工具栏元素) {
    按钮注册表.forEach(
        按钮配置 => {
            //避免重复插入嘛
            if(!工具栏元素.querySelector(`[data-item-id="${按钮配置.id}"]`)){
                工具栏元素.appendChild(生成工具栏按钮元素(按钮配置))
            }
        }
    )
}

function 注册自定义工具栏按钮(按钮配置) {
    let 已存在配置 = 按钮注册表.find(
        待检查项 => {
            return 待检查项.id == 按钮配置.id
        }
    )
    if (!已存在配置) {
        按钮注册表.push(按钮配置)
    }
}


function 修改工具栏() {
    let 工具栏元素序列 = document.querySelectorAll('.protyle-toolbar')
    工具栏元素序列.forEach(
        工具栏元素 => { 
            插入自定义按钮(工具栏元素) 
        }
    )
}

document.addEventListener("click", 修改工具栏)

export default {
    注册自定义工具栏按钮:注册自定义工具栏按钮
}

