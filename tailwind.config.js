/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-inter)', 'Arial', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', '"SFMono-Regular"', 'Monaco', 'Inconsolata', '"Fira Code"', '"Droid Sans Mono"', '"Source Code Pro"', 'monospace'],
      },
    },
  },
  plugins: [],
}
