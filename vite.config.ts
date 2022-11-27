import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: path('./src/auto-imports.d.ts'),
      dirs: [path('./src/stores')],
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      vueTemplate: true,
      resolvers: [ElementPlusResolver(), IconsResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Component({
      dts: path('./src/components.d.ts'),
      dirs: ['src/components'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: false,
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': path('./src')
    }
  }
})

function path(input: string, base?: string | URL | undefined) {
  return fileURLToPath(new URL(input, base || import.meta.url))
}
