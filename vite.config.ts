import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { ESLint } from 'eslint'
// @ts-ignore
import eslint from 'vite-plugin-eslint'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})
