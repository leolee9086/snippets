export class  kernelApiList{
    constructor(option={
        思源伺服ip:"127.0.0.1",
        思源伺服端口:"6806",
        思源伺服协议:"http",
		apitoken:""
		
    }){
    let 思源伺服ip =  option.思源伺服ip||option.siYuanIp||"127.0.0.1"
    let 思源伺服端口 =  option.思源伺服端口||option.siYuanPort||"6806"
    let 思源伺服协议 =  option.思源伺服协议||option.siYuanScheme||"http"
	this.apitoken =  option.apitoken||""
    this.思源伺服地址 = 思源伺服协议+ "://"+思源伺服ip+":"+思源伺服端口
	if(option.siYuanServiceURL){this.思源伺服地址=option.siYuanServiceURL}
	if(option.思源伺服地址){this.思源伺服地址=option.思源伺服地址}
    this.set("GET", "/api/system/bootProgress", "bootProgress","获取启动进度")
	this.set("POST", "/api/system/bootProgress", "bootProgress")
	this.set("GET", "/api/system/version", "version","获取软件版本")
	this.set("POST", "/api/system/version", "version","获取软件版本")
	this.set("POST", "/api/system/currentTime", "currentTime","获取当前时间")
	this.set("POST", "/api/system/uiproc", "addUIProcess","UI生成进度")
	this.set("POST", "/api/system/loginAuth", "LoginAuth","登录鉴权")
	this.set("POST", "/api/system/logoutAuth", "LogoutAuth","退出登录")
	// 需要鉴权
	this.set("POST", "/api/transactions", 'transactions','获取emoji配置')

	this.set("POST", "/api/system/getEmojiConf", 'getEmojiConf','获取emoji配置')
	this.set("POST", "/api/system/setAccessAuthCode",  'setAccessAuthCode','设置鉴权码')
	this.set("POST", "/api/system/setNetworkServe", 'setNetworkServe','设置网络服务器')
	this.set("POST", "/api/system/setUploadErrLog", 'setUploadErrLog','设置上传错误日志')
	this.set("POST", "/api/system/setNetworkProxy",  'setNetworkProxy','设置网络代理')
	this.set("POST", "/api/system/setWorkspaceDir",  'setWorkspaceDir','设置工作空间目录')
	this.set("POST", "/api/system/listWorkspaceDirs",'listWorkspaceDirs','获取工作空间目录')
	this.set("POST", "/api/system/setAppearanceMode",  'setAppearanceMode','设置外观模式')
	this.set("POST", "/api/system/getSysFonts", 'getSysFonts','获取系统字体')
	this.set("POST", "/api/system/setE2EEPasswd",  'setE2EEPasswd','设置E2EE密码')
	this.set("POST", "/api/system/exit",'exit','退出')
	this.set("POST", "/api/system/setUILayout", 'setUILayout','设置UI布局')
	this.set("POST", "/api/system/getConf",  'getConf','获取配置')
	this.set("POST", "/api/system/checkUpdate", 'checkUpdate','检查更新')
    //登录
	this.set("POST", "/api/account/login",  'login','登录账号')
	this.set("POST", "/api/account/checkActivationcode", 'checkActivationcode','检查激活码')
	this.set("POST", "/api/account/useActivationcode",  'useActivationcode','使用激活码')
	this.set("POST", "/api/account/deactivate",  'deactivateUser','注销账号')
    //笔记本相关
	this.set("POST", "/api/notebook/lsNotebooks",  'lsNotebooks','获取笔记本列表')
	this.set("POST", "/api/notebook/openNotebook",  'openNotebook','打开笔记本')
	this.set("POST", "/api/notebook/closeNotebook",  'closeNotebook','关闭笔记本')
	this.set("POST", "/api/notebook/getNotebookConf",  'getNotebookConf','获取笔记本配置')
	this.set("POST", "/api/notebook/setNotebookConf",  'setNotebookConf','设置笔记本配置')
	this.set("POST", "/api/notebook/createNotebook", 'createNotebook','创建笔记本')
	this.set("POST", "/api/notebook/removeNotebook",  'removeNotebook','删除笔记本')
	this.set("POST", "/api/notebook/renameNotebook",  'renameNotebook','重命名笔记本')
	this.set("POST", "/api/notebook/changeSortNotebook",  'changeSortNotebook','改变笔记本排序')
	this.set("POST", "/api/notebook/setNotebookIcon", 'setNotebookIcon','设置笔记本图标')
    //文档树相关
	this.set("POST", "/api/filetree/searchDocs", 'searchDocs','搜索文档')
	this.set("POST", "/api/filetree/listDocsByPath",  'listDocsByPath','获取路径下文档列表')
	this.set("POST", "/api/filetree/getDoc",  'getDoc','获取文档')
	this.set("POST", "/api/filetree/getDocNameTemplate",  'getDocNameTemplate','获取文档名称模板')
	this.set("POST", "/api/filetree/changeSort",  'changeSort','改变文档排序')
	this.set("POST", "/api/filetree/lockFile", 'lockFile','锁定文档')
	this.set("POST", "/api/filetree/createDocWithMd",   'createDocWithMd','创建文档')
	this.set("POST", "/api/filetree/createDailyNote",  'createDailyNote','创建日记')
	this.set("POST", "/api/filetree/createDoc",  'createDoc','创建文档')
	this.set("POST", "/api/filetree/renameDoc",  'renameDoc','重命名文档')
	this.set("POST", "/api/filetree/removeDoc", 'removeDoc','删除文档')
	this.set("POST", "/api/filetree/moveDoc", 'moveDoc','移动文档')
	this.set("POST", "/api/filetree/moveDocs", 'moveDocs','批量移动文档')

	this.set("POST", "/api/filetree/duplicateDoc",  'duplicateDoc','复制文档')
	this.set("POST", "/api/filetree/getHPathByPath", 'getHPathByPath','通过路径获取文档可读路径')
	this.set("POST", "/api/filetree/getHPathByID", 'getHPathByID','通过id获取文档可读路径')
	this.set("POST", "/api/filetree/getFullHPathByID",  'getFullHPathByID','通过id获取完整文档可读路径')
	this.set("POST", "/api/filetree/doc2Heading",  'doc2Heading','文档转换为标题')
	this.set("POST", "/api/filetree/heading2Doc",  'heading2Doc','标题转换为文档')
	this.set("POST", "/api/filetree/li2Doc", 'li2Doc','列表转换为文档')
	this.set("POST", "/api/filetree/refreshFiletree", 'refreshFiletree','刷新文档树')
    //格式化相关
	this.set("POST", "/api/format/autoSpace",  'autoSpace','自动空格')
	this.set("POST", "/api/format/netImg2LocalAssets", 'netImg2LocalAssets','网络图片转本地资源')
    //历史相关
	this.set("POST", "/api/history/getNotebookHistory",  'getNotebookHistory','获取笔记本历史')
	this.set("POST", "/api/history/rollbackNotebookHistory",  'rollbackNotebookHistory','回滚笔记本历史')
	this.set("POST", "/api/history/getAssetsHistory", 'getAssetsHistory','获取资源历史')
	this.set("POST", "/api/history/rollbackAssetsHistory",'rollbackAssetsHistory','回滚资源历史')
	this.set("POST", "/api/history/getDocHistory",  'getDocHistory','获取文档历史')
	this.set("POST", "/api/history/getDocHistoryContent", 'getDocHistoryContent','获取文档历史内容')
	this.set("POST", "/api/history/rollbackDocHistory",  'rollbackDocHistory','回滚文档历史')
	this.set("POST", "/api/history/clearWorkspaceHistory", 'clearWorkspaceHistory','清空工作区历史')
    //大纲、书签与标签相关
	this.set("POST", "/api/outline/getDocOutline", 'getDocOutline','获取文档大纲')
	this.set("POST", "/api/bookmark/getBookmark", 'getBookmark','获取书签')
	this.set("POST", "/api/bookmark/renameBookmark",  'renameBookmark','重命名书签')
	this.set("POST", "/api/tag/getTag", 'getTag','获取标签')
	this.set("POST", "/api/tag/renameTag", 'renameTag','重命名标签')
	this.set("POST", "/api/tag/removeTag",  'removeTag','删除标签')
    //lute相关
	this.set("POST", "/api/lute/spinBlockDOM",  'spinBlockDOM') // 未测试
	this.set("POST", "/api/lute/html2BlockDOM", 'html2BlockDOM','html转blockDOM')
	this.set("POST", "/api/lute/copyStdMarkdown",  'copyStdMarkdown','复制标准markdown')
	this.set("POST", "/api/query/sql",  'sql','sql查询')
	this.set("POST", "/api/query/sql",  'SQL','sql查询')
    //搜索相关
	this.set("POST", "/api/search/searchTag", 'searchTag','搜索标签')
	this.set("POST", "/api/search/searchTemplate", 'searchTemplate','搜索模板')
	this.set("POST", "/api/search/searchWidget",  'searchWidget','搜索挂件')
	this.set("POST", "/api/search/searchRefBlock",  'searchRefBlock','搜索引用块')
	this.set("POST", "/api/search/searchEmbedBlock", 'searchEmbedBlock','搜索嵌入块')
	this.set("POST", "/api/search/fullTextSearchBlock",  'fullTextSearchBlock','全文搜索块')
	this.set("POST", "/api/search/searchAsset", 'searchAsset','搜索资源')
	this.set("POST", "/api/search/findReplace",'findReplace','查找替换')
    //块相关
	this.set("POST", "/api/block/getBlockInfo",  'getBlockInfo','获取块信息')
	this.set("POST", "/api/block/getBlockDOM",  'getBlockDOM','获取块DOM')
	this.set("POST", "/api/block/getBlockBreadcrumb", 'getBlockBreadcrumb','获取块面包屑')
	this.set("POST", "/api/block/getRefIDs",  'getRefIDs','获取引用块id')
	this.set("POST", "/api/block/getRefIDsByFileAnnotationID",  'getRefIDsByFileAnnotationID','根据文件标记id获取引用块id')
	this.set("POST", "/api/block/getBlockDefIDsByRefText",  'getBlockDefIDsByRefText','根据引用文本获取块定义id')
	this.set("POST", "/api/block/getRefText",  'getRefText','获取引用文本')
	this.set("POST", "/api/block/getBlockWordCount",'getBlockWordCount','获取块字数')
	this.set("POST", "/api/block/getRecentUpdatedBlocks",  'getRecentUpdatedBlocks','获取最近更新的块')
	this.set("POST", "/api/block/getDocInfo",  'getDocInfo','获取文档信息')
	this.set("POST", "/api/block/checkBlockExist",  'checkBlockExist','检查块是否存在')
	this.set("POST", "/api/block/checkBlockFold",'checkBlockFold','检查块是否展开')
	this.set("POST", "/api/block/insertBlock",  'insertBlock','插入块')
	this.set("POST", "/api/block/prependBlock",  'prependBlock','插入前置子块')
	this.set("POST", "/api/block/appendBlock",  'appendBlock','插入后置子块')
	this.set("POST", "/api/block/updateBlock",  'updateBlock','更新块')
	this.set("POST", "/api/block/deleteBlock", 'deleteBlock','删除块')
	this.set("POST", "/api/block/setBlockReminder", 'setBlockReminder','设置块提醒')
	this.set("POST", "/api/block/getBlockKramdown", 'getBlockKramdown','获取块Kramdown')

    //文件相关
	this.set("POST", "/api/file/getFile", 'getFile','获取文件')
	this.set("POST", "/api/file/putFile", 'putFile','上传文件')
    //引用相关
	this.set("POST", "/api/ref/refreshBacklink", 'refreshBacklink','刷新反向链接')
	this.set("POST", "/api/ref/getBacklink", 'getBacklink','获取反向链接')
	this.set("POST", "/api/ref/createBacklink", 'createBacklink','创建反向链接')
	this.set("POST", "/api/ref/getBacklinkDoc", 'getBacklinkDoc','获取反链文档')
	this.set("POST", "/api/ref/getBackmentionDoc", 'getBackmentionDoc','获取提及文档')

    //属性相关
	this.set("POST", "/api/attr/getBookmarkLabels",  'getBookmarkLabels','获取书签标签')
	this.set("POST", "/api/attr/resetBlockAttrs", 'resetBlockAttrs','重置块属性')
	this.set("POST", "/api/attr/setBlockAttrs",'setBlockAttrs','设置块属性')
	this.set("POST", "/api/attr/getBlockAttrs", 'getBlockAttrs','获取块属性')
    //云端相关
	this.set("POST", "/api/cloud/getCloudSpace",  'getCloudSpace','获取云端空间')
    //备份相关
	this.set("POST", "/api/backup/getLocalBackup",  'getLocalBackup','获取本地备份')
	this.set("POST", "/api/backup/createLocalBackup", 'createLocalBackup','创建本地备份')
	this.set("POST", "/api/backup/recoverLocalBackup",'recoverLocalBackup','恢复本地备份')
	this.set("POST", "/api/backup/uploadLocalBackup", 'uploadLocalBackup','上传本地备份')
	this.set("POST", "/api/backup/downloadCloudBackup",  'downloadCloudBackup','下载云端备份')
	this.set("POST", "/api/backup/removeCloudBackup",  'removeCloudBackup','删除云端备份')
    //同步相关
	this.set("POST", "/api/sync/setSyncEnable",  'setSyncEnable','设置同步开关')
	this.set("POST", "/api/sync/setCloudSyncDir",  'setCloudSyncDir','设置云端同步目录')
	this.set("POST", "/api/sync/createCloudSyncDir", 'createCloudSyncDir','创建云端同步目录')
	this.set("POST", "/api/sync/removeCloudSyncDir",'removeCloudSyncDir','删除云端同步目录')
	this.set("POST", "/api/sync/listCloudSyncDir", 'listCloudSyncDir','获取云端同步目录')
	this.set("POST", "/api/sync/performSync", 'performSync','执行同步')
	this.set("POST", "/api/sync/performBootSync", 'performBootSync','执行启动同步')
	this.set("POST", "/api/sync/getBootSync",  'getBootSync','获取启动同步')
	this.set("POST", "/api/sync/getSyncDirection",  'getSyncDirection','获取同步方向')
    //收集箱相关
	this.set("POST", "/api/inbox/getShorthands", 'getShorthands','获取收集箱简写')
	this.set("POST", "/api/inbox/removeShorthands",  'removeShorthands','删除收集箱简写')
    
	this.set("POST", "/api/extension/copy", 'extensionCopy','复制扩展')

	this.set("POST", "/api/clipboard/readFilePaths",'readFilePaths','读取剪贴板文件路径')
    //附件相关
	this.set("POST", "/api/asset/uploadCloud",  'uploadCloud','上传云端附件')
	this.set("POST", "/api/asset/insertLocalAssets",  'insertLocalAssets','插入本地附件')
	this.set("POST", "/api/asset/resolveAssetPath", 'resolveAssetPath','解析附件路径')
	this.set("POST", "/api/asset/upload",'upload','上传附件')
	this.set("POST", "/api/asset/setFileAnnotation", 'setFileAnnotation','设置附件注释')
	this.set("POST", "/api/asset/getFileAnnotation",  'getFileAnnotation','获取附件注释')
	this.set("POST", "/api/asset/getUnusedAssets",  'getUnusedAssets','获取未使用的附件')
	this.set("POST", "/api/asset/removeUnusedAsset", 'removeUnusedAsset','删除未使用的附件')
	this.set("POST", "/api/asset/removeUnusedAssets",  'removeUnusedAssets','批量删除未使用的附件')
	this.set("POST", "/api/asset/getDocImageAssets",  'getDocImageAssets','获取文档图片附件')
    //导出相关
	this.set("POST", "/api/export/batchExportMd",  'batchExportMd','批量导出Markdown')
	this.set("POST", "/api/export/exportMd",  'exportMd','导出Markdown')
	this.set("POST", "/api/export/exportSY",  'exportSY','导出SY')
	this.set("POST", "/api/export/exportMdContent",  'exportMdContent','导出Markdown内容')
	this.set("POST", "/api/export/exportHTML",  'exportHTML','导出HTML')
	this.set("POST", "/api/export/exportMdHTML", 'exportMdHTML','导出MarkdownHTML')
	this.set("POST", "/api/export/exportDocx",  'exportDocx','导出Docx')
	this.set("POST", "/api/export/addPDFOutline",  'addPDFOutline','添加PDF目录')
	this.set("POST", "/api/export/preview",  'exportPreview','预览')
	this.set("POST", "/api/export/exportData",  'exportData','导出数据')
	this.set("POST", "/api/export/exportDataInFolder",  'exportDataInFolder','导出数据到文件夹')
    //导入相关
	this.set("POST", "/api/import/importStdMd", 'importStdMd','导入标准Markdown')
	this.set("POST", "/api/import/importData", 'importData','导入数据')
	this.set("POST", "/api/import/importSY",  'importSY','导入SY')

	this.set("POST", "/api/template/render", 'renderTemplate','渲染模板')
	this.set("POST", "/api/template/docSaveAsTemplate",  'docSaveAsTemplate','文档另存为模板')

	this.set("POST", "/api/transactions",  'performTransactions','执行事务')
    //设置相关
	this.set("POST", "/api/setting/setAccount",  'setAccount','设置账户')
	this.set("POST", "/api/setting/setEditor",  'setEditor','设置编辑器')
	this.set("POST", "/api/setting/setExport",  'setExport','设置导出')
	this.set("POST", "/api/setting/setFiletree",  'setFiletree','设置文件树')
	this.set("POST", "/api/setting/setSearch",  'setSearch','设置搜索')
	this.set("POST", "/api/setting/setKeymap",  'setKeymap','设置快捷键')
	this.set("POST", "/api/setting/setAppearance",  'setAppearance','设置外观')
	this.set("POST", "/api/setting/getCloudUser",  'getCloudUser','获取云端用户')
	this.set("POST", "/api/setting/logoutCloudUser",  'logoutCloudUser','注销云端用户')
	this.set("POST", "/api/setting/login2faCloudUser", 'login2faCloudUser','二次验证登录云端用户')
	this.set("POST", "/api/setting/getCustomCSS",  'getCustomCSS','获取自定义CSS')
	this.set("POST", "/api/setting/setCustomCSS", 'setCustomCSS','设置自定义CSS')
	this.set("POST", "/api/setting/setEmoji",  'setEmoji','设置emoji')
	this.set("POST", "/api/setting/setSearchCaseSensitive",  'setSearchCaseSensitive','设置搜索是否区分大小写')
    //图谱相关
	this.set("POST", "/api/graph/resetGraph",  'resetGraph','重置图谱')
	this.set("POST", "/api/graph/resetLocalGraph", 'resetLocalGraph','重置本地图谱')
	this.set("POST", "/api/graph/getGraph",  'getGraph','获取图谱')
	this.set("POST", "/api/graph/getLocalGraph",  'getLocalGraph','获取本地图谱')
    //集市相关
	this.set("POST", "/api/bazaar/getBazaarWidget",  'getBazaarWidget','获取集市挂件')
	this.set("POST", "/api/bazaar/installBazaarWidget", 'installBazaarWidget','安装集市挂件')
	this.set("POST", "/api/bazaar/uninstallBazaarWidget", 'uninstallBazaarWidget','卸载集市挂件')
	this.set("POST", "/api/bazaar/getBazaarIcon",  'getBazaarIcon','获取集市图标')
	this.set("POST", "/api/bazaar/installBazaarIcon",  'installBazaarIcon','安装集市图标')
	this.set("POST", "/api/bazaar/uninstallBazaarIcon",  'uninstallBazaarIcon','卸载集市图标')
	this.set("POST", "/api/bazaar/getBazaarTemplate",  'getBazaarTemplate','获取集市模板')
	this.set("POST", "/api/bazaar/installBazaarTemplate", 'installBazaarTemplate','安装集市模板')
	this.set("POST", "/api/bazaar/uninstallBazaarTemplate", 'uninstallBazaarTemplate','卸载集市模板')
	this.set("POST", "/api/bazaar/getBazaarTheme",  'getBazaarTheme','获取集市主题')
	this.set("POST", "/api/bazaar/installBazaarTheme", 'installBazaarTheme','安装集市主题')
	this.set("POST", "/api/bazaar/uninstallBazaarTheme", 'uninstallBazaarTheme','卸载集市主题')
	this.set("POST", "/api/bazaar/getBazaarPackageREAME",  'getBazaarPackageREAME','获取集市包说明')
	//消息相关
	this.set("POST", "/api/notification/pushMsg", 'pushMsg','发送消息')
	this.set("POST", "/api/notification/pushErrMsg",  'pushErrMsg','发送错误消息')
	//存储相关
	this.set("POST", "/api/storage/getRecentDocs",  'getRecentDocs','获取最近打开文档')
}
    async set(方法,路径,英文名,中文名){
        this[英文名] =this.生成方法(方法,路径).bind(this)
		this[英文名]['raw'] =this.生成方法(方法,路径,true).bind(this)

        中文名?this[中文名] = this[英文名]:null
    }
    生成方法(方法,路径,flag){
        return async function(data,apitoken="",callback){
            let resData  = null
			if (data instanceof FormData) {
				data = data;
			} else {
				data = JSON.stringify(data);
			}   
			let head =   {
				'Authorization': 'Token '+ this.apitoken,

				'user-agent': 'Mozilla Mobile/4.0 MDN Example',
			}
			if (!this.apitoken){
				head={
					'user-agent': 'Mozilla Mobile/4.0 MDN Example',

				}
			}  
			await fetch(this.思源伺服地址+路径,{
                body: data,
                method:方法,
                headers:head,
            }).then(function(response){resData= response.json()})
            let realData = await resData
			if(!flag){
			if(callback){callback(realData.data?realData.data:null)}
            return realData.data?realData.data:null    
			}
			else{
				if(callback){callback(realData?realData:null)}
				return realData?realData:null    
	
			}
        }
    }
}

export default new kernelApiList({思源伺服端口:window.location.port})