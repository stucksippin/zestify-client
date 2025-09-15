module.exports = {
    content: [
        './app/**/*.{vue,ts,js}',
        './components/**/*.{vue,ts,js}',
        './pages/**/*.{vue,ts,js}',
        './layouts/**/*.{vue,ts,js}',
        './plugins/**/*.{ts,js}',
        './nuxt.config.{ts,js}'
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                border: 'hsl(var(--border))',
                'accent-rating': 'hsl(var(--accent-rating))',
            }
        }
    },
    plugins: [],
}