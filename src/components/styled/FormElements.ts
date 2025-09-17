import styled from 'styled-components';
import theme from '../../styles/theme';
import { FormGroup, Label, ErrorText } from './Common';

export { FormGroup, Label, ErrorText };

export const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

export const FormTitle = styled.h2`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.primary};
  text-align: center;
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSizes.medium};
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.white};
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.2);
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.xs};
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  font-size: ${theme.fontSizes.medium};
  
  input {
    cursor: pointer;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSizes.medium};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: background-color ${theme.transitions.short} ease-in-out;
  
  &:hover {
    background-color: #152c6b; /* Darker shade of primary */
  }
  
  &:disabled {
    background-color: ${theme.colors.secondary};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled(ErrorText)`
  margin-top: ${theme.spacing.xs};
`;