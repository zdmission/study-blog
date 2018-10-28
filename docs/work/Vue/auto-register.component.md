# 利用webpack的require.context自动读取文件，注册组件

```js
import Vue from 'vue'

// 把返回来的路劲都处理掉，比如./zhao/TestE.vue => TestE
const capitalizeFirstLetter = (str) => {
	return str.substr(str.lastIndexOf('/')+1).replace(/\.\w+$/,'')
}
// 动态传入路径，便于通用
const dynamicComponent = (value) => {
	// 找到某个路劲下边以.vue为后缀名的文件
	const requireComponent = value
	requireComponent.keys().forEach(fileName => {
		const componentConfig = requireComponent(fileName)

		//因为得到的filename格式是: './zhao/TestE.vue或者是./TestA.vue', 所以这里我们去掉头和尾，只保留真正的文件名
		const componentName = capitalizeFirstLetter(fileName)
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		Vue.component(componentName, componentConfig.default || componentConfig)
	});
}

export default dynamicComponent

/**
 * !使用方法：首先引入，其次调用，注意函数的参数值，必须是 require.context('./component', true, /\.vue$/)，require.context第一个参数表示文件夹路劲(注意上下文)，第二个参数表示是否遍历子文件夹，true表示遍历，false表示不遍历，第三个参数是正则表达式，你想要什么样的文件，js，css，vue，jsx等等，看你的正则怎么写
 * ? import dynamicComponent from '@js/modules/componentGlobal'
 * ? dynamicComponent(require.context('./component', true, /\.vue$/))
 */

```