/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom fitness brand colors
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                accent: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                // Mapping DaisyUI colors for Tailwind utility usage
                'base-100': 'var(--base-100)',
                'base-200': 'var(--base-200)',
                'base-300': 'var(--base-300)',
                'base-content': 'var(--base-content)',
                'primary-content': 'var(--primary-content)',
                'secondary-content': 'var(--secondary-content)',
                'accent-content': 'var(--accent-content)',
                'neutral-content': 'var(--neutral-content)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#3b82f6",
                    "secondary": "#8b5cf6",
                    "accent": "#f97316",
                    "neutral": "#374151",
                    "base-100": "#ffffff",
                    "base-200": "#f9fafb",
                    "base-300": "#f3f4f6",
                    "base-content": "#1f2937",
                    "info": "#0ea5e9",
                    "success": "#10b981",
                    "warning": "#f59e0b",
                    "error": "#ef4444",
                },
                dark: {
                    "primary": "#60a5fa",
                    "secondary": "#a78bfa",
                    "accent": "#fb923c",
                    "neutral": "#374151",
                    "base-100": "#1f2937",
                    "base-200": "#111827",
                    "base-300": "#0f172a",
                    "base-content": "#f3f4f6",
                    "info": "#38bdf8",
                    "success": "#34d399",
                    "warning": "#fbbf24",
                    "error": "#f87171",
                },
            },
        ],
        darkTheme: "dark",
        base: true,
        styled: true,
        utils: true,
    },
}
