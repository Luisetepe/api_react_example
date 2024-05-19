import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@api': path.resolve(__dirname, './src/api'),
			'@db': path.resolve(__dirname, './src/db'),
			'@lib': path.resolve(__dirname, './src/lib')
		}
	}
})
