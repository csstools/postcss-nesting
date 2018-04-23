// tooling
const postcss = require('postcss');
const plugin = require('..');

// fragment
const $fragment = document.createDocumentFragment();

// result preformatted container
const $result = $fragment.appendChild(document.createElement('pre')); $result.className = 'css-root';

// cache
const cache = { from: 'cp-pen-styles', source: '', result: '' };

// parse <style> after running its contents through a PostCSS plugin
function updateStyle($style) {
	cache.source = $style.textContent;

	return postcss([
		plugin()
	]).process(cache.source, {
		from: cache.from
	}).then(
		result => postcss().process(result.css.trim(), {
			from: cache.from,
			stringifier: postcssToSyntaxHTML
		})
	).then(
		result => {
			if ($style.parentNode) {
				$style.parentNode.removeChild($style);
			}

			if (result.css !== cache.result) {
				$result.innerHTML = cache.result = result.css;
			}
		},
		console.error
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

// on document ready
document.addEventListener('DOMContentLoaded', () => {
	document.body.appendChild($fragment);
});

// format css as syntax-highlighted HTML
function postcssToSyntaxHTML(root, builder) {
	function toString(node, semicolon) {
		if ('atrule' === node.type) {
			return atruleToString(node, semicolon);
		} if ('rule' === node.type) {
			return ruleToString(node, semicolon);
		} else if ('decl' === node.type) {
			return declToString(node, semicolon);
		} else if ('comment' === node.type) {
			return commentToString(node, semicolon);
		} else {
			return node.nodes ? node.nodes.map(childNodes => toString(childNodes, semicolon)).join('') : String(node);
		}
	}

	function atruleToString(atrule, semicolon) {
		return `${atrule.raws.before||''}<span class=css-atrule><span class=css-atrule-name>@${atrule.name}</span>${atrule.raws.afterName||''}<span class=css-atrule-params>${atrule.params}</span>${atrule.raws.between||''}${atrule.nodes?`<span class=css-block>{${atrule.nodes.map(node => toString(node, atrule.raws.semicolon)).join('')}${atrule.raws.after||''}}</span>`:semicolon?';':''}</span>`;
	}

	function ruleToString(rule) {
		return `${rule.raws.before||''}<span class=css-rule><span class=css-selector>${rule.selector}</span>${rule.raws.between||''}<span class=css-block>{${rule.nodes.map(node => toString(node, rule.raws.semicolon)).join('')}${rule.raws.after||''}}</span></span>`;
	}

	function declToString(decl, semicolon) {
		return `${decl.raws.before || ''}<span class=css-declaration><span class=css-property>${decl.prop}</span>${decl.raws.between || ':'}<span class=css-value>${decl.value}</span>;</span>`;
	}

	function commentToString(comment) {
		return `${comment.raws.before}<span class=css-comment>/*${comment.raws.left}${comment.text}${comment.raws.right}*/</span>`;
	}

	builder(
		toString(root)
	);
}
