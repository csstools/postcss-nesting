import { replaceable } from './valid-selector.js'

export default function mergeSelectors(fromSelectors, toSelectors) {
	return toSelectors.map((toSelector) => {
		let needsIsOnFromSelector = false

		if (fromSelectors.length > 1) {
			needsIsOnFromSelector = true
		}

		// foo &foo foo & baz -> foo &:is(foo) foo & baz
		toSelector = toSelector.replaceAll(/&((?:[\w-_|])(?:[^\s,{]*))/g, (match, p1) => {
			return `&:is(${p1})`
		})

		return needsIsOnFromSelector
				? toSelector.replace(replaceable, `:is(${fromSelectors.join(', ')})`)
				: toSelector.replace(replaceable, fromSelectors.join(', '))
	})
}
