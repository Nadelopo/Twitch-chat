import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { license, name, version } from './package.json'

export default defineConfig((config) => {
  return {
    plugins: [
      Userscript({
        entry: 'src/index.ts',
        header: {
          name,
          version,
          license,
          match: 'https://www.twitch.tv/*',
        },
        server: {
          open: true,
          port: 3000,
        },
      }),
    ],
  }
})
