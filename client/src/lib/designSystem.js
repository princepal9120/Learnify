colors = {
    // Neutrals
    white: '#FFFFFF',
    black: '#000000',

    // Primary (Black)
    primary: '#000000',

    // Secondary (Trust Blue)
    secondary: '#1A73E8',

    // Accent (Gamification Yellow)
    accent: '#F7D900',

    // Semantic
    success: '#34A853',
    warning: '#FBBC04',
    error: '#EA4335',
    info: '#1A73E8',

    // Grays
    gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    }
};

/**
 * TYPOGRAPHY
 * Font Stack: Inter, Helvetica, SF Pro, sans-serif
 */
const typography = {
    // Headings - Black/Bold weight
    h1: { size: '64px', weight: 900, lineHeight: '72px', tracking: '-2px' },
    h2: { size: '48px', weight: 900, lineHeight: '56px', tracking: '-1px' },
    h3: { size: '32px', weight: 800, lineHeight: '40px' },
    h4: { size: '24px', weight: 800, lineHeight: '32px' },

    // Body
    bodyLarge: { size: '18px', weight: 500, lineHeight: '28px' },
    bodyMedium: { size: '16px', weight: 500, lineHeight: '24px' },
    bodySmall: { size: '14px', weight: 500, lineHeight: '20px' },

    // UI Text
    button: { size: '16px', weight: 700, lineHeight: '24px', tracking: '0.5px' },
    label: { size: '14px', weight: 600, lineHeight: '20px', tracking: '0.5px' },
    caption: { size: '12px', weight: 600, lineHeight: '16px', tracking: '0.4px' },
};

/**
 * SPACING SCALE (8px base)
 */
const spacing = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
};

/**
 * BORDERS & SHADOWS
 */
const borders = {
    thin: '1px',
    medium: '2px',
    thick: '3px',
    extraThick: '4px',

    radius: {
        none: '0',
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
    },
};

const shadows = {
    brutal: '2px 2px 0 rgba(0, 0, 0, 0.1)',
    brutalMd: '4px 4px 0 rgba(0, 0, 0, 0.15)',
    brutalLg: '6px 6px 0 rgba(0, 0, 0, 0.2)',
};


const BrutalButtonExample = `
<button className="
  px-6 py-3 
  text-base font-bold 
  bg-black text-white 
  border-2 border-black 
  rounded-lg
  transition-all duration-200
  hover:bg-white hover:text-black
  active:scale-95
">
  Click Me
</button>
`;

// Example: Card
const BrutalCardExample = `
<div className="
  p-6 
  bg-white
  border-2 border-black
  rounded-lg
  transition-all duration-200
  hover:shadow-brutal-md
">
  Content
</div>
`;

// Example: Bento Grid
const BentoGridExample = `
<div className="
  grid 
  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
  gap-6 
  auto-rows-max
">
  {/* Items */}
</div>
`;

export default {
    colors,
    typography,
    spacing,
    borders,
    shadows,
};
