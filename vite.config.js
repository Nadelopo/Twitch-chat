import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import Userscript from 'vite-userscript-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    Userscript({
      entry: 'src/main.jsx',
      header: {
        name: 'Twitch-preact',
        version: '1',
        description: 'chat',
        match: 'https://www.twitch.tv/*',
      },
      server: {
        open: true,
        port: 3000,
      },
    }),
  ],
})
