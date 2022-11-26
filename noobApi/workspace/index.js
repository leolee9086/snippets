class workspace {
    constructor(){

    }
    工作空间路径=window.siyuan.config.system.workspaceDir
    数据路径=window.siyuan.config.system.dataDir
    代码片段路径=this.数据路径 + '\\snippets'
}
export default new workspace()