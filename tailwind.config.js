/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-foreground': '#ffffff',
        background: '#ffffff',
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#2563eb',
        accent: '#f3f4f6',
        'accent-foreground': '#111827',
        muted: '#6b7280',
        'muted-foreground': '#6b7280',
        popover: '#ffffff',
        'popover-foreground': '#111827',
        card: '#ffffff',
        'card-foreground': '#111827',
      },
    },
  },
  plugins: [],
};