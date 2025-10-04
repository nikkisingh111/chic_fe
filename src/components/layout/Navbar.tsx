import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useAuth } from '../../context/AuthContext'; // 1. Import useAuth to get the logout function

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

// This component is for both Login and Logout buttons now
const AuthButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  font-weight: ${theme.fontWeights.medium};
  text-decoration: none;
  transition: background-color ${theme.transitions.short} ease-in-out;
  border: none;
  cursor: pointer;

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

// A styled div to make the mobile logout look like a link
const MobileLogoutButton = styled.div`
  color: ${theme.colors.text};
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spacing.sm} 0;
  cursor: pointer;

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
  // 2. Get the logout function from our AuthContext
  const { logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 3. Update the handleLogout function to use the context
  const handleLogout = () => {
    logout(); // This clears the user's token and data
    setIsMobileMenuOpen(false); // Close mobile menu if open
    navigate('/login'); // Redirect the user to the login page
  };

  const handleLogin = () => {
    navigate('/login');
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
              {/* 4. Ensure the logout button is a proper button */}
              <AuthButton onClick={handleLogout}>Logout</AuthButton>
            </UserInfo>
          ) : (
            <AuthButton as={Link} to="/login">Login</AuthButton>
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
              <MobileNavLink to="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>
                Welcome, {username}
              </MobileNavLink>
              {/* 5. Attach the real handleLogout to the mobile button */}
              <MobileLogoutButton onClick={handleLogout}>
                Logout
              </MobileLogoutButton>
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