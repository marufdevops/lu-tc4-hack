module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				dark: '#521262',
				primary: '#6FE7DD',
				brand: '#3490DE',
				light: '#6639A6',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
