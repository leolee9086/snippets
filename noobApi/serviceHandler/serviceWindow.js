

import 事件桥 from '../messageBridge/index.js'
export class serviceHost {
    constructor(服务选项) {
        if(!服务选项.服务名){
            throw '必须提供服务名称'
        }
        this.服务选项 = 服务选项
        //服务主界面文件是一个html,如果缺少的话就不能启动
        this.服务界面文件路径 = 服务选项.文件位置 + '/index.html'
        //服务扩展脚本路径是一个js,自动加载到主界面,如果缺少就不能启动
        this.服务扩展文件路径 = 服务选项.文件位置 + '/extension/index.js'
        //最大响应时间之内如果服务没有发心跳报文就把它干掉
        this.服务最大响应时间 = 服务选项.最大等待时间 || 50
        //初始化服务
        this.初始化()
    }
    初始化() {
        if (window.require) {
            this.初始化服务窗口()
            this.加载服务界面()
            this.初始化事件桥()
        }
    }
    初始化事件桥(){
        let 服务名 = this.服务选项[服务名]
        this.服务主事件桥 = new 事件桥(服务名+'-Main',服务名+'-Main')
    }
    初始化服务窗口() {
        const {
            BrowserWindow,
            screen,
        } = require("@electron/remote")
        //默认窗口大小是屏幕大小的一半
        this.窗口宽度 = 服务选项.窗口宽度 || screen.getPrimaryDisplay().size.width / 2
        this.窗口高度 = 服务选项.窗口高度 || screen.getPrimaryDisplay().size.width / 2
        this.服务图标 = 校验图标(this.服务选项.文件位置)
        this.服务窗口 = new BrowserWindow({
            width: this.窗口宽度,
            height: this.窗口高度,
            frame: true,
            icon: path.join(appDir, 'stage', 'icon-large.png'),
            show: false,
            webPreferences: {
                nativeWindowOpen: true,
                nodeIntegration: true,
                webviewTag: true,
                webSecurity: false,
                contextIsolation: false,
            },
        })
    }
    加载服务界面(){
        this.服务窗口.loadURL(this.服务界面文件路径)
    }
}