# PostCSS Nesting [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![CSS Standard Status][css-img]][css-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Nesting] lets you nest style rules inside each other, following the
[CSS Nesting] specification.

```pcss
a, b {
  color: red;

  & c, & d {
    color: white;
  }
}

/* becomes */

a, b {
  color: red;
}

a c, a d, b c, b d {
  color: white;
}
```

## Usage

Add [PostCSS Nesting] to your project:

```bash
npm install postcss-nesting --save-dev
```

Use [PostCSS Nesting] to process your CSS:

```js
import postcssNesting from 'postcss-nesting';

postcssNesting.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
import postcss from 'postcss';
import postcssNesting from 'postcss-nesting';

postcss([
  postcssNesting(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Nesting] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- |

### Deno ⚠️

Deno is no longer supported because this plugin has dependencies that can not work with Deno.


[cli-img]: https://img.shields.io/travis/csstools/postcss-nesting.svg
[cli-url]: https://travis-ci.org/csstools/postcss-nesting
[css-img]: https://cssdb.org/badge/nesting-rules.svg
[css-url]: https://cssdb.org/#nesting-rules
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-nesting.svg
[npm-url]: https://www.npmjs.com/package/postcss-nesting

[CSS Nesting]: https://drafts.csswg.org/css-nesting-1/
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Nesting]: https://github.com/jonathantneal/postcss-nesting
