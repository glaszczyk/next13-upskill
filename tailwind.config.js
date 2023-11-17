/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",

		// add preline UI
		"node_modules/preline/dist/*.js",
	],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
