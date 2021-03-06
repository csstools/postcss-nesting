import postcssNesting from './postcss-8-nesting.js'

export default Object.defineProperties(postcssNesting, Object.getOwnPropertyDescriptors({
	get postcss() {
		function postcssPlugin(cssRoot) {
			const visitors = postcssNesting()

			if (typeof visitors.Once === 'function') {
				visitors.Once(cssRoot)
			}
		}

		postcssPlugin.postcssPlugin = 'postcss-nesting'
		postcssPlugin.postcssVersion = '8.2.13'

		return postcssPlugin
	}
}))
