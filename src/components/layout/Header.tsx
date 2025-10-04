import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import theme from '../../styles/theme';
import { Container, PrimaryButton, SecondaryButton } from '../styled/Common';

// --- Styled Components for the Header ---
const HeaderWrapper = styled.header`
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.small};
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: ${theme.fontSizes.large};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none; // Hides nav links on smaller screens for simplicity
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const WelcomeText = styled.span`
  color: ${theme.colors.text};
  font-weight: ${theme.fontWeights.medium};
`;

// --- Header Component ---
interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, username }) => {
  // 1. Get the logout function from our AuthContext
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 2. Create a handler that calls logout and redirects
  const handleLogout = () => {
    logout(); // This clears the user's token and data
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <HeaderWrapper>
      <NavContainer>
        <Logo to="/">CHIC</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>
        <AuthButtons>
          {isLoggedIn ? (
            <>
              <WelcomeText>Welcome, {username}</WelcomeText>
              {/* 3. Attach the handleLogout function to the button's onClick event */}
              <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
            </>
          ) : (
            <>
              <SecondaryButton as={Link} to="/login">Login</SecondaryButton>
              <PrimaryButton as={Link} to="/signin">Sign Up</PrimaryButton>
            </>
          )}
        </AuthButtons>
      </NavContainer>
    </HeaderWrapper>
  );
};

export default Header;