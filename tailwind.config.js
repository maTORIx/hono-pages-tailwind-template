/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "Noto Sans JP", 'sans'],
                serif: ["Roboto", "BIZ UDMincho", 'serif'],
                mono: ["Roboto Mono", "mono"]
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                }
            },
            animation: {
                fadeIn: 'fadeIn .2s ease-out'
            }
        },
    },
    plugins: [],
}

