import plugin from "../mod.js";
import postcss from "https://deno.land/x/postcss/mod.js"
import { assertStrictEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";

postcss([plugin]).process(`
a [foo="&"] {
	color : red;

	& {
		color : blue;
	}
}
`, { from : 'raw', to : 'raw' }).then(result => {
	assertStrictEquals(result.css, `
a [foo="&"] {
	color : red
}
a [foo="&"] {
		color : blue;
	}
`)
})
