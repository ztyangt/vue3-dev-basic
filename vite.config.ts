import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'APP')

  return {
    base: env.APP_BASE_URL || '/',
    envPrefix: 'APP',

    server: {
      host: '0.0.0.0',
      port: 8080,

      proxy: {
        '/api': {
          target: env.APP_BASE_API || 'http://127.0.0.1:9527',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\//, ''),
        },
        '/sources': {
          target: env.APP_BASE_API || 'http://127.0.0.1:9527',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\//, ''),
        },
      },
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
           @use "~/styles/main.scss" as *;
           @use "~/styles/element/index.scss" as *;
           `,
        },
      },
    },

    plugins: [
      vue(),
      vueJsx(),
      // vueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'unplugin/auto-imports.d.ts',
        dirs: [],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: 'unplugin/components.d.ts',
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      createSvgIconsPlugin({
        // 指定 SVG图标 保存的文件夹路径
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定 使用svg图标的格式
        symbolId: 'icon-[dir]-[name]',
      }),

      codeInspectorPlugin({
        bundler: 'vite',
        editor: 'trae',
        showSwitch: true,
        hideConsole: true,
      }),
    ],

    worker: {
      rollupOptions: {
        output: {
          entryFileNames: 'worker/[name]-[hash].js',
          chunkFileNames: 'worker/[name]-[hash].js',
        },
      },
    },
    build: {
      // minify: 'esbuild',
      // minify: 'terser',
      // // 打包后的文件输出目录
      outDir: env.APP_OUT_DIR || 'dist',
      assetsDir: 'static',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name]-[hash].js',
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames(assetInfo) {
            const imgExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico']
            if (assetInfo.name?.endsWith('.css')) {
              return 'static/css/[name]-[hash].css'
            }
            if (imgExts.some((ext) => assetInfo.name?.endsWith(ext))) {
              return 'static/images/[name]-[hash][ext]'
            }
            return 'assets/[name]-[hash][ext]'
          },

          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
  }
})
