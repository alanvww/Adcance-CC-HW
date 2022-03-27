import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		watch: {
			usePolling: true,
		},
	},
	root: '.',
	build: {
		outDir: '../dist',
	},
});
