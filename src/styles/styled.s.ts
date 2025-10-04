import 'styled-components';
import theme from './theme'; // Import your actual theme

// By creating this file, we are extending the default theme type for styled-components
// to include all the properties from our own theme file.
declare module 'styled-components' {
  // This makes TypeScript aware of your theme's structure
  export interface DefaultTheme {
    colors: typeof theme.colors;
    fontSizes: typeof theme.fontSizes;
    fontWeights: typeof theme.fontWeights;
    spacing: typeof theme.spacing;
    borderRadius: typeof theme.borderRadius;
    shadows: typeof theme.shadows;
    breakpoints: typeof theme.breakpoints;
    transitions: typeof theme.transitions;
  }
}