import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	// SETUP PROXY SERVER
	/* Front-end runs on port 5173 and back-end runs on port 5100 */
	/* These are two different ports, therefore it is not possible to fetch back-end data on the front-end by default */

	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5100/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			}
		}
	}
})
