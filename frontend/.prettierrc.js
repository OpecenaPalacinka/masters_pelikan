const overridableDefaults = {
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 100,
  useTabs: false
}

/** @type {import("prettier").Config} */
export default {
  ...overridableDefaults,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  tailwindFunctions: ['tv'],
  tailwindConfig: './tailwind.config.ts',
  plugins: ['prettier-plugin-tailwindcss']
}
