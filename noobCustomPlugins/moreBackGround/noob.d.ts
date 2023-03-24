declare module 'siyuan-noob'{
    export * from 'siyuan'
}
declare module 'siyuan' {
    import { api as frontEndApi } from "noobApi"
    import { kernelApi } from "noobApi"
    export { kernelApi as kernelApi }
    export {frontEndApi as frontEndApi}
    type EventCallbackOptions = {
        click(event: MouseEvent): null,
        mouseover(event: MouseEvent): null
    }
    type toolBarItemOptions = {
        icon?: string,
        图标?: string,
        label?: string,
        提示?: string,
        element?: HTMLElement,
        callback?(event: MouseEvent): void,
        events?: EventCallbackOptions
    }
    export class Plugin {
        registToolbarItem(
            positions: string,
            options: toolBarItemOptions
        ): void
        注册顶栏按钮(
            positions: string,
            options: toolBarItemOptions
        ): void
        //因为接口是通过核心插件动态配置的,所以这个下面的配置会随着版本有一定的变化,只有当完全确定下来之后才会有完整的类型定义
        接口注册表: [
                {
                    "供应插件": {
                        //提供这个接口的插件文档路经
                        "说明文档路径":string
                    },
                    "接口配置": {
                        "中文名": "注册顶栏按钮",
                        "英文名": "registToolbarItem",
                        "功能": "在窗口顶栏增加一个按钮",
                        "参数": [
                            {
                                "位置": "控制按钮出现在窗口的哪一侧"
                            },
                            {
                                "配置": {
                                    "文字或者label": "按钮的文字提示",
                                    "图标或icon": "按钮显示的图标,可以通过注册图标接口添加可用的图标",
                                    "点击回调函数或者callback": "点击按钮时的回调",
                                    "事件配置或者events": "不同事件的回调函数,当提供此项时,点击回调函数项无效",
                                    "元素或者element": "直接传入按钮内容元素,不推荐使用"
                                }
                            }
                        ],
                        "返回值": "没有返回值",
                        "其他": "注册的顶栏按钮会在插件被关闭时移除"
                    }
                },
                {
                    "供应插件": {
                        "说明文档路径": "/data/snippets/noobPluginsReadme/configPage_readme.md",
                        "设置页标题": "插件设置"
                    },
                    "接口配置": {
                        "中文名": "打开网页页签",
                        "英文名": "openPage",
                        "功能": "打开一个网页页签,常用于打开设置页签或者打开文件之类",
                        "参数": {
                            "地址": "页签所在的地址",
                            "关闭回调或callback": "页签关闭时的回调函数"
                        },
                        "返回值": "没有返回值",
                        "其他": "页签不会像其他思源页签一样下次打开之后保持,它会被去掉"
                    }
                },
                {
                    "供应插件": {
                        "说明文档路径": "/data/snippets/noobPluginsReadme/configPage_readme.md",
                        "设置页标题": "插件设置"
                    },
                    "接口配置": {
                        "中文名": "获取设置",
                        "英文名": "getConfig",
                        "功能": "返回插件文件夹中的config.json的内容",
                        "参数": "没有参数",
                        "返回值": "返回一个对象, 其内容为解析之后的插件设置内容",
                        "其他": "可以通过调用saveConfig接口来获取设置,需要注意的是存在多个窗口时需要注意设置保存可能有延迟"
                    }
                },
                {
                    "供应插件": {
                        "说明文档路径": "/data/snippets/noobPluginsReadme/configPage_readme.md",
                        "设置页标题": "插件设置"
                    },
                    "接口配置": {
                        "中文名": "生成设置页",
                        "英文名": "buildConfigPage",
                        "功能": "通过配置创建一个设置页",
                        "参数": "配置页参数",
                        "返回值": "返回配置页对象",
                        "其他": "可以通过this.configPage对象来配置设置页渲染函数,configPage对象应当提供一个mount接口,对话框元素将会被传入这个位置,你可以在此对它进行一些修改"
                    }
                },
                {
                    "供应插件": {
                        "说明文档路径": "/data/snippets/noobPluginsReadme/configPage_readme.md",
                        "设置页标题": "插件设置"
                    },
                    "接口配置": {
                        "中文名": "保存设置",
                        "英文名": "saveConfig",
                        "功能": "将插件的config对象保存到插件文件夹中的config.json文件",
                        "参数": "没有参数",
                        "返回值": "返回一个对象, 其内容为解析之后的插件设置内容",
                        "其他": "可以通过调用getConfig接口来获取设置,需要注意的是存在多个窗口时需要注意设置保存可能有延迟"
                    }
                },
                {
                    "供应插件": {
                        "说明文档路径": "/data/snippets/noobPluginsReadme/configPage_readme.md",
                        "设置页标题": "插件设置"
                    },
                    "接口配置": {
                        "中文名": "保存系统设置",
                        "英文名": "saveNoobConfig",
                        "功能": "保存针对工作空间启动noob时的设置",
                        "参数": {
                            "key": "需要保存的参数名称",
                            "value": "需要保存的参数值,只能接受能够以json序列化的值"
                        },
                        "返回值": "返回一个对象,其内容为解析之后的对应系统设置文件内容",
                        "其他": "不建议滥用这个接口,它应该是用于存储系统级别的配置"
                    }
                },
                {
                    "供应插件": {
                        "说明文档路径": "/data/snippets/noobPluginsReadme/configPage_readme.md",
                        "设置页标题": "插件设置"
                    },
                    "接口配置": {
                        "中文名": "开启插件",
                        "英文名": "noobRunPlugin",
                        "功能": "实例化某个插件,开启它的功能",
                        "参数": {
                            "name": "需要实例化的插件名称"
                        },
                        "返回值": "返回插件的实例",
                        "其他": "不建议滥用这个接口,它应该是用于插件系统本身的管理功能"
                    }
                },
                {
                    "供应插件": {
                        "说明文档路径": "/data/snippets/noobPluginsReadme/configPage_readme.md",
                        "设置页标题": "插件设置"
                    },
                    "接口配置": {
                        "中文名": "关闭插件",
                        "英文名": "noobClosePlugin",
                        "功能": "反实例化某个插件,尽可能关闭它的功能",
                        "参数": {
                            "name": "需要反实例化的插件名称"
                        },
                        "返回值": "返回插件的实例",
                        "其他": "不建议滥用这个接口,它应该是用于插件系统本身的管理功能"
                    }
                }
            ]
        }
    }

declare module 'noobApi' {
    import kernelApi from 'kernelApi'
    export { kernelApi as kernelApi }
    export let api: {
        自定义菜单,
        menus,
        内容块,
        block,
        编辑器: {},
        editor: {},
        核心api,
        kernelApi,
        DOM工具,
        DOMUtil,
        布局: {
            注册自定义tab,
            Tab,
            util,
            自定义窗口工具栏,
            Dialog
        },
        layout: {
            registTabType,
            Tab,
            util,
            customToolBar,
            Dialog
        }
        url动作: {
            注册url动作,
        },
        urlScheme: {
            registAction,
        },
        workspace: {
            readFile,
            writeFile,
            exists,
            currentThemeURL,
        },
        工作空间: {
            读取文件,
            写入文件,
            存在,
            当前主题,

        },

    }
}

declare module 'kernelApi' {
    type siyuanRes = {
        code: number,
        data: object
        msg: string
    }

    var kernelApi: {
        //"/api/system/bootProgress"
        bootProgress,
        获取启动进度,

        //"/api/system/bootProgress"
        //bootProgress,

        //"/api/system/version"
        version,
        获取软件版本,

        //"/api/system/version"
        //version,
        //获取软件版本,

        //"/api/system/currentTime"
        currentTime,
        获取当前时间,

        //"/api/system/uiproc"
        addUIProcess,
        UI生成进度,

        //"/api/system/loginAuth"
        LoginAuth,
        登录鉴权,

        //"/api/system/logoutAuth"
        LogoutAuth,
        退出登录,

        //"/api/system/getCaptcha,
        GetCaptcha,
        获取验证码,


        // 需要鉴权

        //"/api/system/getEmojiConf,
        getEmojiConf,
        获取emoji配置,

        //"/api/system/setAccessAuthCode",
        setAccessAuthCode,
        设置鉴权码,

        //"/api/system/setNetworkServe,
        setNetworkServe,
        设置网络服务器,

        //"/api/system/setUploadErrLog,
        setUploadErrLog,
        设置上传错误日志,

        //"/api/system/setAutoLaunch,
        setAutoLaunch,
        设置自动启动,

        //"/api/system/setGoogleAnalytics",
        setGoogleAnalytics,
        设置谷歌数据分析,

        //"/api/system/setDownloadInstallPkg"
        setDownloadInstallPkg,
        设置是否下载安装包,

        //"/api/system/setNetworkProxy",
        setNetworkProxy,
        设置网络代理,

        //"/api/system/setWorkspaceDir",
        setWorkspaceDir,
        设置工作空间目录,

        //"/api/system/getWorkspaces",
        getWorkspaces,
        获取工作空间目录,

        //"/api/system/getMobileWorkspaces",
        getMobileWorkspaces,
        获取移动端工作空间目录,

        //"/api/system/createWorkspaceDir",
        createWorkspaceDir,
        创建工作空间,

        //"/api/system/removeWorkspaceDir",
        removeWorkspaceDir,
        移除动作空间,

        //"/api/system/setAppearanceMode",
        setAppearanceMode,
        设置外观模式,

        //"/api/system/getSysFonts,
        getSysFonts,
        获取系统字体,

        //"/api/system/exit",
        exit,
        退出,

        //"/api/system/setUILayout,
        setUILayout,
        设置UI布局,

        //"/api/system/getConf",
        getConf,
        获取配置,

        //"/api/system/checkUpdate,
        checkUpdate,
        检查更新,

        //"/api/system/exportLog,
        exportLog,
        导出日志,

        //存储相关
        //"/api/storage/setLocalStorage",
        setLocalStorage,
        设置存储,

        //"/api/storage/getLocalStorage",
        getLocalStorage,
        获取存储,

        //"/api/storage/setLocalStorageVal",
        setLocalStorageVal,
        设置存储项,

        //"/api/storage/removeLocalStorageVal"
        removeLocalStorageVal,
        获取存储项,

        //"/api/storage/setCriterion"
        setCriterion,
        设置标准,

        //"/api/storage/getCriteria"
        getCriteria,
        获取标准,

        //"/api/storage/removeCriterion"
        removeCriterion,
        移除标准,

        //"/api/storage/getRecentDocs"
        getRecentDocs,
        获取最近文档,

        //账户登录
        //"/api/account/login",
        login,
        登录账号,

        //"/api/account/checkActivationcode,
        checkActivationcode,
        检查激活码,

        //"/api/account/useActivationcode",
        useActivationcode,
        使用激活码,

        //"/api/account/deactivate",
        deactivateUser,
        注销账号,

        //"/api/account/startFreeTrial,
        startFreeTrial,
        开始免费试用,

        //笔记本相关
        //"/api/notebook/lsNotebooks",
        lsNotebooks,
        获取笔记本列表,

        //"/api/notebook/openNotebook",
        openNotebook,
        打开笔记本,

        //"/api/notebook/closeNotebook",
        closeNotebook,
        关闭笔记本,

        //"/api/notebook/getNotebookConf",
        getNotebookConf,
        获取笔记本配置,

        //"/api/notebook/setNotebookConf",
        setNotebookConf,
        设置笔记本配置,

        //"/api/notebook/createNotebook,
        createNotebook,
        创建笔记本,

        //"/api/notebook/removeNotebook",
        removeNotebook,
        删除笔记本,

        //"/api/notebook/renameNotebook",
        renameNotebook,
        重命名笔记本,

        //"/api/notebook/changeSortNotebook",
        changeSortNotebook,
        改变笔记本排序,

        //"/api/notebook/setNotebookIcon,
        setNotebookIcon,
        设置笔记本图标,

        //文档树相关
        //"/api/filetree/searchDocs,
        searchDocs,
        搜索文档,

        //"/api/filetree/listDocsByPath",
        listDocsByPath,
        获取路径下文档列表,

        //"/api/filetree/getDoc",
        getDoc,
        获取文档,

        //"/api/filetree/getDocCreateSavePath",
        getDocCreateSavePath,
        获取文档创建位置,

        //"/api/filetree/getRefCreateSavePath,
        getRefCreateSavePath,
        获取块引创建位置,

        //"/api/filetree/changeSort",
        changeSort,
        改变文档排序,

        //"/api/filetree/createDocWithMd",   'createDocWithMd,
        创建文档,

        //"/api/filetree/createDailyNote",
        createDailyNote,
        创建日记,

        //"/api/filetree/createDoc",
        createDoc,
        //创建文档,

        //"/api/filetree/renameDoc",
        renameDoc,
        重命名文档,

        //"/api/filetree/removeDoc,
        removeDoc,
        删除文档,

        //"/api/filetree/removeDocs",
        removeDocs,
        批量删除文档,

        //"/api/filetree/moveDocs,
        moveDocs,
        批量移动文档,

        //"/api/filetree/duplicateDoc",
        duplicateDoc,
        复制文档,

        //"/api/filetree/getHPathByPath,
        getHPathByPath,
        通过路径获取文档可读路径,

        //"/api/filetree/getHPathsByPaths,
        getHPathsByPaths,
        通过路径列表获取文档可读路径列表,

        //"/api/filetree/getHPathByID,
        getHPathByID,
        通过id获取文档可读路径,

        //"/api/filetree/getFullHPathByID",
        getFullHPathByID,
        通过id获取完整文档可读路径,

        //"/api/filetree/doc2Heading",
        doc2Heading,
        文档转换为标题,

        //"/api/filetree/heading2Doc",
        heading2Doc,
        标题转换为文档,

        //"/api/filetree/li2Doc,
        li2Doc,
        列表转换为文档,

        //"/api/filetree/refreshFiletree,
        refreshFiletree,
        刷新文档树,

        //格式化相关
        //"/api/format/autoSpace",
        autoSpace,
        自动空格,

        //"/api/format/netImg2LocalAssets,
        netImg2LocalAssets,
        网络图片转本地资源,

        //历史相关
        //"/api/history/getNotebookHistory",
        getNotebookHistory,
        获取笔记本历史,

        //"/api/history/rollbackNotebookHistory",
        rollbackNotebookHistory,
        回滚笔记本历史,

        //"/api/history/rollbackAssetsHistory",
        rollbackAssetsHistory,
        回滚资源历史,

        //"/api/history/getDocHistoryContent,
        getDocHistoryContent,
        获取文档历史内容,

        //"/api/history/rollbackDocHistory",
        rollbackDocHistory,
        回滚文档历史,

        //"/api/history/clearWorkspaceHistory,
        clearWorkspaceHistory,
        清空工作区历史,

        //"/api/history/reindexHistory",
        reindexHistory,
        重建历史索引,

        //"/api/history/searchHistory,
        searchHistory,
        搜索历史,

        //"/api/history/getDocHistory",
        getHistoryItems,
        获取历史条目,

        //大纲、书签与标签相关
        //"/api/outline/getDocOutline,
        getDocOutline,
        获取文档大纲,

        //"/api/bookmark/getBookmark,
        getBookmark,
        获取书签,

        //"/api/bookmark/renameBookmark",
        renameBookmark,
        重命名书签,

        //"/api/bookmark/removeBookmark",
        removeBookmark,
        移除书签,

        //"/api/tag/getTag,
        getTag,
        获取标签,

        //"/api/tag/renameTag,
        renameTag,
        重命名标签,

        //"/api/tag/removeTag",
        removeTag,
        删除标签,

        //lute相关
        //"/api/lute/spinBlockDOM",
        spinBlockDOM,
        // 未测试
        //"/api/lute/html2BlockDOM,
        html2BlockDOM,
        html转blockDOM,

        //"/api/lute/copyStdMarkdown",
        copyStdMarkdown,
        复制标准markdown,

        //sql相关
        //"/api/query/sql",
        sql,
        sql查询,

        //搜索相关
        //"/api/search/searchTag,
        searchTag,
        搜索标签,

        //"/api/search/searchTemplate,
        searchTemplate,
        搜索模板,

        //"/api/search/searchWidget",
        searchWidget,
        搜索挂件,

        //"/api/search/searchRefBlock",
        searchRefBlock,
        搜索引用块,

        //"/api/search/searchEmbedBlock,
        searchEmbedBlock,
        搜索嵌入块,

        //"/api/search/fullTextSearchBlock",
        fullTextSearchBlock,
        全文搜索块,

        //"/api/search/searchAsset,
        searchAsset,
        搜索资源,

        //"/api/search/findReplace",
        findReplace,
        查找替换,

        //块相关
        //"/api/block/getBlockInfo",
        getBlockInfo,
        获取块信息,

        //"/api/block/getBlockDOM",
        getBlockDOM,
        获取块DOM,

        //"/api/block/getBlockKramdown,
        getBlockKramdown,
        获取块kramdown,

        //"/api/block/getBlockBreadcrumb,
        getBlockBreadcrumb,
        获取块面包屑,

        //"/api/block/getBlockIndex,
        getBlockIndex,
        获取块索引,

        //"/api/block/getRefIDs",
        getRefIDs,
        获取引用块id,

        //"/api/block/getRefIDsByFileAnnotationID",
        getRefIDsByFileAnnotationID,
        根据文件标记id获取引用块id,

        //"/api/block/getBlockDefIDsByRefText",
        getBlockDefIDsByRefText,
        根据引用文本获取块定义id,

        //"/api/block/getRefText",
        getRefText,
        获取引用文本,

        //"/api/block/getTreeStat,
        getTreeStat,
        获取树状态,

        //"/api/block/getBlockWordCount",
        getBlockWordCount,
        获取块字数,

        //"/api/block/getContentWordCount",
        getContentWordCount,
        获取内容字数统计,

        //"/api/block/getRecentUpdatedBlocks",
        getRecentUpdatedBlocks,
        获取最近更新的块,

        //"/api/block/getDocInfo",
        getDocInfo,
        获取文档信息,

        //"/api/block/checkBlockExist",
        checkBlockExist,
        检查块是否存在,

        //"/api/block/checkBlockFold",
        checkBlockFold,
        检查块是否展开,

        //"/api/block/insertBlock",
        insertBlock,
        插入块,

        //"/api/block/prependBlock",
        prependBlock,
        插入前置子块,

        //"/api/block/appendBlock",
        appendBlock,
        插入后置子块,

        //"/api/block/updateBlock",
        updateBlock,
        更新块,

        //"/api/block/deleteBlock,
        deleteBlock,
        删除块,

        //"/api/block/setBlockReminder,
        setBlockReminder,
        设置块提醒,

        //"/api/block/getHeadingLevelTransaction,
        getHeadingLevelTransaction,
        获取标题级别事务,

        //"/api/block/getHeadingDeleteTransaction,
        getHeadingDeleteTransaction,
        获取标题删除事务,

        //"/api/block/getHeadingChildrenIDs",
        getHeadingChildrenIDs,
        获取标题子块id,

        //"/api/block/getHeadingChildrenDOM,
        getHeadingChildrenDOM,
        获取标题子块DOM,

        //"/api/block/swapBlockRef,
        swapBlockRef,
        交换引用,

        //"/api/block/transferBlockRef,
        transferBlockRef,
        转移引用,

        //文件相关
        //"/api/file/getFile,
        getFile,
        获取文件,

        //"/api/file/putFile,
        putFile,
        上传文件,

        //"/api/file/copyFile,
        copyFile,
        复制文件,

        //"/api/file/removeFile,
        removeFile,
        移除文件,

        //引用相关
        //"/api/ref/refreshBacklink,
        refreshBacklink,
        刷新反向链接,

        //"/api/ref/getBacklink,
        getBacklink,
        获取反向链接,

        //"/api/ref/createBacklink,
        createBacklink,
        创建反向链接,

        //"/api/ref/getBacklinkDoc,
        getBacklinkDoc,
        获取反链文档,

        //"/api/ref/getBackmentionDoc,
        getBackmentionDoc,
        获取提及文档,

        //属性相关
        //"/api/attr/getBookmarkLabels",
        getBookmarkLabels,
        获取书签标签,

        //"/api/attr/resetBlockAttrs,
        resetBlockAttrs,
        重置块属性,

        //"/api/attr/setBlockAttrs",
        setBlockAttrs,
        设置块属性,

        //"/api/attr/getBlockAttrs,
        getBlockAttrs,
        获取块属性,

        //云端相关
        //"/api/cloud/getCloudSpace",
        getCloudSpace,
        获取云端空间,

        //同步相关
        //"/api/sync/setSyncEnable",
        setSyncEnable,
        设置同步开关,

        //"/api/sync/setSyncGenerateConflictDoc",
        setSyncGenerateConflictDoc,
        设置同步是否生成冲突文件,

        //"/api/sync/setSyncMode,
        setSyncMode,
        设置同步模式,

        //"/api/sync/setSyncProvider,
        setSyncProvider,
        设置同步供应商,

        //"/api/sync/setSyncProviderS3",
        setSyncProviderS3,
        设置S3同步配置,

        //"/api/sync/setSyncProviderWebDAV",
        setSyncProviderWebDAV,
        设置webdav同步配置,

        //"/api/sync/setCloudSyncDir",
        setCloudSyncDir,
        设置云端同步目录,

        //"/api/sync/createCloudSyncDir,
        createCloudSyncDir,
        创建云端同步目录,

        //"/api/sync/removeCloudSyncDir",
        removeCloudSyncDir,
        删除云端同步目录,

        //"/api/sync/listCloudSyncDir,
        listCloudSyncDir,
        获取云端同步目录,

        //"/api/sync/performSync,
        performSync,
        执行同步,

        //"/api/sync/performBootSync,
        performBootSync,
        执行启动同步,

        //"/api/sync/getBootSync",
        getBootSync,
        获取启动同步,

        //收集箱相关
        //"/api/inbox/getShorthands,
        getShorthands,
        获取收集箱简写列表,

        //"/api/inbox/getShorthand,
        getShorthand,
        获取收集箱简写,

        //"/api/inbox/removeShorthands",
        removeShorthands,
        删除收集箱简写,

        //浏览器插件相关
        //"/api/extension/copy,
        extensionCopy,
        复制扩展,

        //剪贴板相关
        //"/api/clipboard/readFilePaths",
        readFilePaths,
        读取剪贴板文件路径,

        //附件相关
        //"/api/asset/uploadCloud",
        uploadCloud,
        上传云端附件,

        //"/api/asset/insertLocalAssets",
        insertLocalAssets,
        插入本地附件,

        //"/api/asset/resolveAssetPath,
        resolveAssetPath,
        解析附件路径,

        //"/api/asset/upload",
        upload,
        上传附件,

        //"/api/asset/setFileAnnotation,
        setFileAnnotation,
        设置附件注释,

        //"/api/asset/getFileAnnotation",
        getFileAnnotation,
        获取附件注释,

        //"/api/asset/getUnusedAssets",
        getUnusedAssets,
        获取未使用的附件,

        //"/api/asset/removeUnusedAsset,
        removeUnusedAsset,
        删除未使用的附件,

        //"/api/asset/removeUnusedAssets",
        removeUnusedAssets,
        批量删除未使用的附件,

        //"/api/asset/getDocImageAssets",
        getDocImageAssets,
        获取文档图片附件,

        //"/api/asset/renameAsset",
        renameAsset,
        重命名附件,

        //导出相关
        //"/api/export/batchExportMd",
        batchExportMd,
        批量导出Markdown,

        //"/api/export/exportMd",
        exportMd,
        导出Markdown,

        //"/api/export/exportSY",
        exportSY,
        导出SY,

        //"/api/export/exportNotebookSY,
        exportNotebookSY,
        导出笔记本sy,

        //"/api/export/exportMdContent",
        exportMdContent,
        导出Markdown内容,

        //"/api/export/exportHTML",
        exportHTML,
        导出HTML,

        //"/api/export/exportPreviewHTML,
        exportPreviewHTML,
        导出预览HTML,

        //"/api/export/exportMdHTML,
        exportMdHTML,
        导出MarkdownHTML,

        //"/api/export/exportDocx",
        exportDocx,
        导出Docx,

        //"/api/export/processPDF,
        processPDF,
        生成PDF,

        //"/api/export/preview",
        exportPreview,
        预览,

        //"/api/export/exportAsFile,
        exportAsFile,
        文件形式导出,

        //"/api/export/exportData",
        exportData,
        导出数据,

        //"/api/export/exportDataInFolder",
        exportDataInFolder,
        导出数据到文件夹,

        //"/api/export/exportTempContent,
        exportTempContent,
        导出缓存内容,

        //"/api/export/export2Liandi,
        export2Liandi,
        导出到链滴,

        //导入相关
        //"/api/import/importStdMd,
        importStdMd,
        导入标准Markdown,

        //"/api/import/importData,
        importData,
        导入数据,

        //"/api/import/importSY",
        importSY,
        导入SY,

        //模板相关
        //"/api/template/render,
        renderTemplate,
        渲染模板,

        //"/api/template/docSaveAsTemplate",
        docSaveAsTemplate,
        文档另存为模板,

        //事务相关
        //"/api/transactions",
        performTransactions,
        执行事务,

        //设置相关
        //"/api/setting/setAccount",
        setAccount,
        设置账户,

        //"/api/setting/setEditor",
        setEditor,
        设置编辑器,

        //"/api/setting/setExport",
        setExport,
        设置导出,

        //"/api/setting/setFiletree",
        setFiletree,
        设置文件树,

        //"/api/setting/setSearch",
        setSearch,
        设置搜索,

        //"/api/setting/setKeymap",
        setKeymap,
        设置快捷键,

        //"/api/setting/setAppearance",
        setAppearance,
        设置外观,

        //"/api/setting/getCloudUser",
        getCloudUser,
        获取云端用户,

        //"/api/setting/logoutCloudUser",
        logoutCloudUser,
        注销云端用户,

        //"/api/setting/login2faCloudUser,
        login2faCloudUser,
        二次验证登录云端用户,

        //"/api/setting/getCustomCSS",
        getCustomCSS,
        获取自定义CSS,

        //"/api/setting/setCustomCSS,
        setCustomCSS,
        设置自定义CSS,

        //"/api/setting/setEmoji",
        setEmoji,
        设置emoji,

        //"/api/setting/setSearchCaseSensitive",
        setSearchCaseSensitive,
        设置搜索是否区分大小写,

        //图谱相关
        //"/api/graph/resetGraph",
        resetGraph,
        重置图谱,

        //"/api/graph/resetLocalGraph,
        resetLocalGraph,
        重置本地图谱,

        //"/api/graph/getGraph",
        getGraph,
        获取图谱,

        //"/api/graph/getLocalGraph",
        getLocalGraph,
        获取本地图谱,

        //集市相关
        //"/api/bazaar/getBazaarWidget",
        getBazaarWidget,
        获取集市挂件,

        //"/api/bazaar/getInstalledWidget,
        getInstalledWidget,
        获取已安装的挂件列表,

        //"/api/bazaar/installBazaarWidget,
        installBazaarWidget,
        安装集市挂件,

        //"/api/bazaar/uninstallBazaarWidget,
        uninstallBazaarWidget,
        卸载集市挂件,

        //"/api/bazaar/getBazaarIcon",
        getBazaarIcon,
        获取集市图标,

        //"/api/bazaar/getInstalledIcon,
        getInstalledIcon,
        获取已安装的图标,

        //"/api/bazaar/installBazaarIcon",
        installBazaarIcon,
        安装集市图标,

        //"/api/bazaar/uninstallBazaarIcon",
        uninstallBazaarIcon,
        卸载集市图标,

        //"/api/bazaar/getBazaarTemplate",
        getBazaarTemplate,
        获取集市模板,

        //"/api/bazaar/getInstalledTemplate,
        getInstalledTemplate,
        获取已安装的模板列表,

        //"/api/bazaar/installBazaarTemplate,
        installBazaarTemplate,
        安装集市模板,

        //"/api/bazaar/uninstallBazaarTemplate,
        uninstallBazaarTemplate,
        卸载集市模板,

        //"/api/bazaar/getBazaarTheme",
        getBazaarTheme,
        获取集市主题,

        //"/api/bazaar/getInstalledTheme",
        getInstalledTheme,
        获取已安装的主题,

        //"/api/bazaar/installBazaarTheme,
        installBazaarTheme,
        安装集市主题,

        //"/api/bazaar/uninstallBazaarTheme,
        uninstallBazaarTheme,
        卸载集市主题,

        //"/api/bazaar/getBazaarPackageREAME",
        getBazaarPackageREAME,
        获取集市包说明,

        //仓库相关
        //"/api/repo/initRepoKey",
        initRepoKey,
        初始化仓库key,

        //"/api/repo/initRepoKeyFromPassphrase",
        initRepoKeyFromPassphrase,
        从密码初始化仓库key,

        //"/api/repo/resetRepo",
        resetRepo,
        重置仓库,

        //"/api/repo/importRepoKey",
        importRepoKey,
        导入仓库key,

        //"/api/repo/createSnapshot",
        createSnapshot,
        创建快照,

        //"/api/repo/tagSnapshot",
        tagSnapshot,
        标记快照,

        //"/api/repo/checkoutRepo",
        checkoutRepo,
        签出仓库,

        //"/api/repo/getRepoSnapshots",
        getRepoSnapshots,
        获取仓库快照列表,

        //"/api/repo/getRepoTagSnapshots",
        getRepoTagSnapshots,
        获取标记快照列表,

        //"/api/repo/removeRepoTagSnapshot",
        removeRepoTagSnapshot,
        移除标记快照列表,

        //"/api/repo/getCloudRepoTagSnapshots",
        getCloudRepoTagSnapshots,
        获取云端标记快照列表,

        //"/api/repo/removeCloudRepoTagSnapshot",
        removeCloudRepoTagSnapshot,
        移除云端标记快照,

        //"/api/repo/uploadCloudSnapshot",
        uploadCloudSnapshot,
        更新云端快照列表,

        //"/api/repo/downloadCloudSnapshot",
        downloadCloudSnapshot,
        下载云端快照,

        //"/api/repo/diffRepoSnapshots",
        diffRepoSnapshots,
        比较仓库快照,

        //"/api/repo/openRepoSnapshotDoc",
        openRepoSnapshotDoc,
        打开快照文档,

        //间隔重复相关
        //"/api/riff/createRiffDeck",
        createRiffDeck,
        创建间隔重复卡包,

        //"/api/riff/renameRiffDeck",
        renameRiffDeck,
        重命名间隔重复卡包,

        //"/api/riff/removeRiffDeck",
        removeRiffDeck,
        移除间隔重复卡包,

        //"/api/riff/getRiffDecks",
        getRiffDecks,
        获取间隔重复卡包列表,

        //"/api/riff/addRiffCards",
        addRiffCards,
        添加间隔重复卡片,

        //"/api/riff/removeRiffCards",
        removeRiffCards,
        移除间隔重复卡片,

        //"/api/riff/getRiffDueCards",
        getRiffDueCards,
        获取到期间隔重复卡片列表,

        //"/api/riff/getTreeRiffDueCards",
        getTreeRiffDueCards,
        获取到期文档树间隔重复卡片列表,

        //"/api/riff/getNotebookRiffDueCards",
        getNotebookRiffDueCards,
        获取到期笔记本间隔重复卡片列表,

        //"/api/riff/reviewRiffCard",
        reviewRiffCard,
        复习间隔重复卡片,

        //"/api/riff/skipReviewRiffCard",
        skipReviewRiffCard,
        跳过间隔重复卡片,

        //"/api/riff/getRiffCards",
        getRiffCards,
        获取间隔重复卡片列表,

        //"/api/riff/getTreeRiffCards",
        getTreeRiffCards,
        获取文档树间隔重复卡片列表,

        //"/api/riff/getNotebookRiffCards",
        getNotebookRiffCards,
        获取笔记本间隔重复卡片列表,

        //消息相关
        //"/api/notification/pushMsg,
        pushMsg,
        发送消息,

        //"/api/notification/pushErrMsg",
        pushErrMsg,
        发送错误消息,

        //代码片段相关
        //"/api/snippet/getSnippet,
        getSnippet,
        获取代码片段,

        //"/api/snippet/setSnippet,
        setSnippet,
        设置代码片段,

        //"/api/snippet/removeSnippet",
        removeSnippet,
        移除代码片段,

        ////"/snippets/*filepath,
        serveSnippets,
        这个不用生成函数
        //属性视图相关
        //"/api/av/renderAttributeView",
        renderAttributeView,
        渲染属性视图,

        //人工智能相关
        //"/api/ai/chatGPT,
        chatGPT,

        //"/api/ai/chatGPTWithAction,
        chatGPTWithAction,


    }
    export default kernelApi
}
declare module 'siyuanUI' {
    class FormItem {

    }
    class FormInputter {

    }
}