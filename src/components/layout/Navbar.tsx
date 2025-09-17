import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface NavbarProps {
  isLoggedIn: boolean;
  username?: string;
}

const NavbarContainer = styled.nav`
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.small};
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Logo = styled(Link)`
  font-size: ${theme.fontSizes.large};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  font-weight: ${theme.fontWeights.medium};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.short} ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${theme.colors.primary};
  }
`;

const AuthButton = styled(Link)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  font-weight: ${theme.fontWeights.medium};
  text-decoration: none;
  transition: background-color ${theme.transitions.short} ease-in-out;

  &:hover {
    background-color: #152a62; /* Darker shade of primary */
    color: ${theme.colors.white};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text};
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${theme.colors.white};
  flex-direction: column;
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.medium};

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  color: ${theme.colors.text};
  font-weight: ${theme.fontWeights.medium};
  text-decoration: none;
  padding: ${theme.spacing.sm} 0;
  transition: color ${theme.transitions.short} ease-in-out;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.primary};
`;

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, username }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For now, just redirect to home
    navigate('/');
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo to="/">Virtual Stylish</Logo>

        <NavLinks>
          <NavLink to="/">Home</NavLink>
          {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
          <NavLink to="/feedback">Feedback</NavLink>
          
          {isLoggedIn ? (
            <UserInfo>
              <span>Welcome, {username}</span>
              <AuthButton to="/" onClick={handleLogout}>Logout</AuthButton>
            </UserInfo>
          ) : (
            <AuthButton to="/login">Login</AuthButton>
          )}
        </NavLinks>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
          {isLoggedIn && (
            <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </MobileNavLink>
          )}
          <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</MobileNavLink>
          <MobileNavLink to="/feedback" onClick={() => setIsMobileMenuOpen(false)}>Feedback</MobileNavLink>
          
          {isLoggedIn ? (
            <>
              <MobileNavLink to="#" onClick={() => {}}>
                Welcome, {username}
              </MobileNavLink>
              <MobileNavLink to="/" onClick={handleLogout}>
                Logout
              </MobileNavLink>
            </>
          ) : (
            <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </MobileNavLink>
          )}
        </MobileMenu>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;