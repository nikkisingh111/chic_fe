import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import theme from '../../styles/theme';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  username?: string;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: ${theme.spacing.lg} 0;
`;

const Footer = styled.footer`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const FooterTitle = styled.h3`
  font-size: ${theme.fontSizes.large};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.white};
`;

const FooterLink = styled.a`
  display: block;
  color: ${theme.colors.white};
  opacity: 0.8;
  margin-bottom: ${theme.spacing.sm};
  text-decoration: none;
  transition: opacity ${theme.transitions.short} ease-in-out;
  
  &:hover {
    opacity: 1;
    color: ${theme.colors.white};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  font-size: ${theme.fontSizes.small};
  opacity: 0.8;
`;

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn = false, username }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <LayoutContainer>
      <Navbar isLoggedIn={isLoggedIn} username={username} />
      <Main>{children}</Main>
      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>Virtual Stylish</FooterTitle>
            <p style={{ opacity: 0.8, marginBottom: theme.spacing.md }}>
              Your personal style assistant that helps you look your best every day.
            </p>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/feedback">Feedback</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Contact</FooterTitle>
            <FooterLink href="mailto:info@virtualstylish.com">info@virtualstylish.com</FooterLink>
            <FooterLink href="tel:+1234567890">+1 (234) 567-890</FooterLink>
            <FooterLink href="#">123 Fashion Street, Style City</FooterLink>
          </FooterSection>
          
          <Copyright>
            © {currentYear} Virtual Stylish. All rights reserved.
          </Copyright>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;