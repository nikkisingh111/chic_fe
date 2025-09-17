import styled from 'styled-components';
import theme from '../../styles/theme';

// Button components
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeights.medium};
  border-radius: ${theme.borderRadius.medium};
  transition: all ${theme.transitions.short} ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  
  &:hover:not(:disabled) {
    background-color: #152a62; /* Darker shade of primary */
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  
  &:hover:not(:disabled) {
    background-color: rgba(30, 58, 138, 0.05);
  }
`;

// Input components
export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSizes.medium};
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.white};
  transition: border-color ${theme.transitions.short} ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.2);
  }
  
  &::placeholder {
    color: ${theme.colors.secondary};
  }
  
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text};
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

// Card component
export const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

// Container components
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FlexRow = styled(FlexContainer)`
  flex-direction: row;
`;

export const FlexColumn = styled(FlexContainer)`
  flex-direction: column;
`;

export const Spacer = styled.div<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
`;

// Text components
export const Title = styled.h1`
  font-size: ${theme.fontSizes.xxlarge};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xxxlarge};
  }
`;

export const Subtitle = styled.h2`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

export const Text = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

export const ErrorText = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSizes.medium};
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.white};
  transition: border-color ${theme.transitions.short} ease-in-out;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.2);
  }
  
  &::placeholder {
    color: ${theme.colors.secondary};
  }
  
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;