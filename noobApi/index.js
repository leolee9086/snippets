import 工作空间 from './workspace/index.js'
import { 代码片段路径 } from './util/file.js'
import requireHacker from './util/requireHacker.js'
if (!window.noobApi) {
	if (window.require) {
		let { 监听文件修改 } = await import('./util/file.js')
		let 监听选项 = {
			监听路径: 工作空间.代码片段路径,
			监听配置: {
				persistent: true,
				recursive: true
			},
			文件类型: ['js'],
			事件类型: ['change']
		}
		监听文件修改(监听选项)
		requireHacker.setExternalDeps(代码片段路径 + '/node_modules')
	}
	await import('./api.js')
}

export default window.noobApi

