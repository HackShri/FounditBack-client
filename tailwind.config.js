/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        background: '#ffffff',
        foreground: '#111827',
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#2563eb',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#111827',
        },
        destructive: '#dc2626',
        success: '#16a34a',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
};