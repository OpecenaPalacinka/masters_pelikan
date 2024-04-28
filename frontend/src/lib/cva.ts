import { defineConfig } from 'cva'
import { twMerge } from 'tailwind-merge'

const { cx, cva, compose } = defineConfig({
  hooks: {
    onComplete: (cn) => twMerge(cn)
  }
})

export { cx, cva, compose }
