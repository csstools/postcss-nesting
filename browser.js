// tooling
const postcss = require('postcss');
const plugin = require('..');

// cache
const cache = { from: 'cp-pen-styles', source: '', result: '' };

// parse <style> after running its contents through a PostCSS plugin
const updateStyle = $style => {
	cache.source = $style.textContent;

	return postcss([
		plugin()
	]).process(cache.source, {
		from: cache.from
	}).then(
		result => postcss().process(result.css, {
			from: cache.from
		})
	).then(
		result => {
			$style.textContent = cache.result = result.css;
		},
		error => {
			$style.textContent = cache.result;

			console.error(error);
		}
	);
}

// update any pre-existing <style> in <head> using the PostCSS plugin
const $styles = document.head.getElementsByTagName('style');

if ($styles.length) {
	Array.prototype.filter.call($styles, node => node.nodeName === 'STYLE' && node.classList.contains(cache.className))
	.concat($styles[0])
	.slice(0, 1)
	.forEach(updateStyle);
}

// watch for and update any new <style> in <head> using the PostCSS plugin
(new MutationObserver(
	mutations => mutations.forEach(
		mutation => Array.prototype.filter.call(
			mutation.addedNodes || [],
			$node => $node.nodeName === 'STYLE' && $node.classList.contains(cache.className)
		).forEach(updateStyle)
	)
)).observe(document.head, { childList: true });

