import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    // get src/islands/*.tsx and make dict
    const pathes = fs.readdirSync("src/islands").filter(file => file.endsWith(".tsx"))
    const islands = pathes.map(file => file.replace(".tsx", ""))
    const input: { [key: string]: string } = {}
    islands.forEach(island => {
      input[island] = `src/islands/${island}.tsx`
    })

    return {
      build: {
        rollupOptions: {
          input: input,
          output: {
            dir: resolve(__dirname, "dist/static/islands/"),
            entryFileNames: "[name].js",
            chunkFileNames: "[name].js",
            format: "esm",
            assetFileNames: "[name].[ext]",
          }
        }
      },
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      },
    }
  } else {
    return {
      plugins: [
        build(),
        devServer({
          adapter,
          entry: 'src/index.tsx'
        })
      ],
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      }
    }
  }
})

