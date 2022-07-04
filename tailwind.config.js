module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: ({ opacityValue }) => {
                    return `rgba(var(--color-primary), ${opacityValue})`
                },
                secondary: ({ opacityValue }) => {
                    return `rgba(var(--color-secondary), ${opacityValue})`
                },
                accent: ({ opacityValue }) => {
                    return `rgba(var(--color-accent), ${opacityValue})`
                },
                'primary-bg': ({ opacityValue }) => {
                    return `rgba(var(--color-bg-primary), ${opacityValue})`
                },
                'btn-primary': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-primary), ${opacityValue})`
                },
                'btn-secondary': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-secondary), ${opacityValue})`
                },
                'btn-accent': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-accent), ${opacityValue})`
                },
                'btn-active': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-active), ${opacityValue})`
                },
                'btn-disabled': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-disabled), ${opacityValue})`
                },
                'btn-disabled-text': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-disabled-text), ${opacityValue})`
                },
                'btn-text': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-text), ${opacityValue})`
                },
                'btn-hover': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-hover), ${opacityValue})`
                },
                'btn-hover-text': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-hover-text), ${opacityValue})`
                },
                'btn-negative': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-negative), ${opacityValue})`
                },
                'btn-negative-text': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-negative-text), ${opacityValue})`
                },
                'btn-negative-hover': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-negative-hover), ${opacityValue})`
                },
                'btn-negative-hover-text': ({ opacityValue }) => {
                    return `rgba(var(--color-btn-negative-hover-text), ${opacityValue})`
                },
                'txt-primary': ({ opacityValue }) => {
                    return `rgba(var(--color-text-primary), ${opacityValue})`
                },
                'txt-secondary': ({ opacityValue }) => {
                    return `rgba(var(--color-text-secondary), ${opacityValue})`
                },
                'txt-accent': ({ opacityValue }) => {
                    return `rgba(var(--color-text-accent), ${opacityValue})`
                },
                'txt-error': ({ opacityValue }) => {
                    return `rgba(var(--color-text-error), ${opacityValue})`
                },
                'input-background': ({ opacityValue }) => {
                    return `rgba(var(--color-input-background), ${opacityValue})`
                },
                'input-txt-primary': ({ opacityValue }) => {
                    return `rgba(var(--color-input-text-primary), ${opacityValue})`
                },
                'input-txt-secondary': ({ opacityValue }) => {
                    return `rgba(var(--color-input-text-secondary), ${opacityValue})`
                },
                'input-txt-accent': ({ opacityValue }) => {
                    return `rgba(var(--color-input-text-accent), ${opacityValue})`
                },
                'nav-primary': ({ opacityValue }) => {
                    return `rgba(var(--color-nav-primary), ${opacityValue})`
                },
                'nav-primary-active': ({ opacityValue }) => {
                    return `rgba(var(--color-nav-primary-active), ${opacityValue})`
                },
                'nav-primary-inactive': ({ opacityValue }) => {
                    return `rgba(var(--color-nav-primary-inactive), ${opacityValue})`
                },
                'nav-secondary': ({ opacityValue }) => {
                    return `rgba(var(--color-nav-secondary), ${opacityValue})`
                },
                'nav-secondary-active': ({ opacityValue }) => {
                    return `rgba(var(--color-nav-secondary-active), ${opacityValue}`
                },
                'nav-secondary-inactive': ({ opacityValue }) => {
                    return `rgba(var(--color-nav-secondary-inactive), ${opacityValue}`
                },

                'nav-accent': ({ opacityValue }) => {
                    return `rgba(var(--color-nav-accent), ${opacityValue})`
                },
            },
            fontFamily: {
                sans: ['ProximaNova', 'sans-serif'],
                // 'ProximaNova-Regular': ['ProximaNova-Regular', 'sans-serif'],
                // 'ProximaNova-ExtrabldIt': ['ProximaNova-ExtrabldIt', 'sans-serif'],
                // 'ProximaNova-RegularIt': ['ProximaNova-RegularIt', 'sans-serif'],
                // 'ProximaNova-Black': ['ProximaNova-Black', 'sans-serif'],
                // 'ProximaNova-Bold': ['ProximaNova-Bold', 'sans-serif'],
            },
            screens: {
                'xs': '376px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
                '3xl': '1750px',
                'short': { 'raw': '(min-height: 734px)' },
            },
            animation: {
                'shake-error': 'shake 0.4s 1 linear;'
            },
            keyframes: {
                shake: {
                    '0%': { transform: 'translate(20px)' },
                    '20%': { transform: 'translate(-20px)' },
                    '40%': { transform: 'translate(10px)' },
                    '60%': { transform: 'translate(-10px)' },
                    '80%': { transform: 'translate(6px)' },
                    '100%': { transform: 'translate(0px)' },
                }
            }
        },
        backgroundColor: (theme) => ({
            ...theme('colors'),
        }),
        opacity: {
            '0': '0',
            '10': '.10',
            '15': '.15',
            '20': '.20',
            '25': '.25',
            '30': '.30',
            '35': '.35',
            '40': '.40',
            '45': '.45',
            '50': '.50',
            '55': '.55',
            '60': '.60',
            '65': '.65',
            '70': '.70',
            '75': '.75',
            '80': '.80',
            '85': '.85',
            '90': '.90',
            '95': '.95',
            '100': '1',
        },
        scale: {
            '0': '0',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '90': '.9',
            '95': '.95',
            '100': '1',
            '105': '1.05',
            '110': '1.1',
            '125': '1.25',
            '150': '1.5',
            '200': '2',
        },
        minWidth: {
            '0': '0',
            '10': '10%',
            '20': '20%',
            '1/4': '25%',
            '30': '30%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
    },
    variants: {
        extend: {
            opacity: ['active', 'hover'],
            borderRadius: ['hover', 'focus'],
            scale: ['active', 'group-hover'],
            backgroundOpacity: ['active', 'hover'],
            backgroundColor: ['active', 'hover'],
            mixBlendMode: ['hover', 'focus'],
            brightness: ['hover', 'focus'],
        },
    },
    plugins: [
        require('tailwindcss-children'),
    ],
}
