module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          green: {
            50: '#30AF5B',
            90: '#292C27',
          },
          gray: {
            10: '#EEEEEE',
            20: '#A2A2A2',
            30: '#7B7B7B',
            50: '#585858',
            90: '#141414',
          },
          orange: {
            50: '#FF814C',
          },
          blue: {
            70: '#021639',
          },
          yellow: {
            50: '#FEC601',
          },
         'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        },
        backgroundImage: {
          'bg-img-cover': "url('/hero-cover-inner-patissier.svg')",
          'bg-img-cover-2': "url('/hero-cover-inner-patissier-2.svg')",
          'bg-img-1': "url('/img-1.png')",
          'bg-img-2': "url('/img-2.png')",
          // 'feature-bg': "url('/feature-bg.png')",
          // 'feature-bg': "url('/feature-bg.png')",
          'pattern': "url('/pattern.png')",
          'pattern-2': "url('/pattern-bg.png')",
          'bg-img-footer': "url('../public/cheapism.png')",// 
          // 'bg-img-footer-2': "url('/Cheapism.png')",
          // 'bg-img-footer': "url('https://via.placeholder.com/150')",
        },
        brand: {
          burgundy: '#800020',
          cream: '#E4D7D1',
          lavenderBlush: '#FFF0F5', // Your logo color
          accent: '#F8EAEC',
        },
        // Semantic tokens for easy Dark Mode implementation
        surface: {
          light: '#FAFBFB',
          dark: '#121212',
          cardLight: '#FFFFFF',
          cardDark: '#1E1E1E',
        },
        screens: {
          xs: '400px',
          '3xl': '1680px',
          '4xl': '2200px',
        },
        maxWidth: {
          '10xl': '1512px',
        },
        borderRadius: {
          '5xl': '40px',
        },
        fontFamily: {
          // High-end dessert brands use Serif for headers and Sans for body
          playfair: ['"Playfair Display"', 'serif'], 
          inter: ['"Inter"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };