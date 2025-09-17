// Theme configuration for the application
const theme = {
  colors: {
    primary: '#1e3a8a',    // Dark blue
    secondary: '#6b7280',  // Gray
    accent: '#f59e0b',     // Amber
    background: '#f3f4f6',  // Light gray
    text: '#111827',       // Near black
    white: '#ffffff',
    cream: '#f5f5dc',
    error: '#ef4444',      // Red
    success: '#10b981',    // Green
    warning: '#f59e0b',    // Amber
    info: '#3b82f6',       // Blue
  },
  fonts: {
    primary: '"Roboto", "Helvetica", "Arial", sans-serif',
    secondary: '"Playfair Display", serif',
  },
  fontSizes: {
    small: '0.875rem',     // 14px
    medium: '1rem',        // 16px
    large: '1.25rem',      // 20px
    xlarge: '1.5rem',      // 24px
    xxlarge: '2rem',       // 32px
    xxxlarge: '2.5rem',    // 40px
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  spacing: {
    xs: '0.25rem',         // 4px
    sm: '0.5rem',          // 8px
    md: '1rem',            // 16px
    lg: '1.5rem',          // 24px
    xl: '2rem',            // 32px
    xxl: '3rem',           // 48px
  },
  borderRadius: {
    small: '0.25rem',       // 4px
    medium: '0.5rem',       // 8px
    large: '1rem',          // 16px
    full: '9999px',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  transitions: {
    short: '150ms',
    medium: '300ms',
    long: '500ms',
  },
};

export default theme;