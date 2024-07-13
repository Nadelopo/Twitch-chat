import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { license, name, version, description } from './package.json'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const sourcePath = resolve(__dirname, 'dist/twitch-chat.user.js')
if (existsSync(sourcePath)) {
  const destDir = resolve(__dirname, '')
  if (!existsSync(destDir)) {
    mkdirSync(destDir)
  }
  const destPath = resolve(destDir, 'twitch-chat.user.js')
  copyFileSync(sourcePath, destPath)
} else {
  console.error('Source file tsconfig.json does not exist.')
}

export default defineConfig((config) => {
  return {
    plugins: [
      Userscript({
        entry: 'src/index.ts',
        header: {
          name,
          version,
          description,
          license,
          match: 'https://www.twitch.tv/*'
        },
        server: {
          open: true,
          port: 3000
        }
      })
    ]
  }
})
