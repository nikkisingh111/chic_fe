import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${theme.fonts.primary};
    font-size: 16px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.secondary};
    margin-bottom: ${theme.spacing.md};
    font-weight: ${theme.fontWeights.bold};
  }

  h1 {
    font-size: ${theme.fontSizes.xxxlarge};
  }

  h2 {
    font-size: ${theme.fontSizes.xxlarge};
  }

  h3 {
    font-size: ${theme.fontSizes.xlarge};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.short} ease-in-out;

    &:hover {
      color: ${theme.colors.accent};
    }
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};

    @media (min-width: ${theme.breakpoints.md}) {
      padding: 0 ${theme.spacing.lg};
    }
  }
`;

export default GlobalStyles;