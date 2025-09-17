import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import theme from '../styles/theme';
import {
  Container,
  Card,
  Title,
  FormGroup,
  Label,
  Input,
  PrimaryButton,
  ErrorText,
  Text,
} from '../components/styled/Common';

const SignInContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 300px);
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const SignInCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.large};
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledField = styled(Field)`
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
`;

const SignInButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.md};
`;

const LoginText = styled(Text)`
  text-align: center;
  margin-top: ${theme.spacing.lg};
`;

const LoginLink = styled(Link)`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeights.medium};
`;

const TermsText = styled(Text)`
  font-size: ${theme.fontSizes.small};
  text-align: center;
  margin-top: ${theme.spacing.md};
  color: ${theme.colors.secondary};
`;

const TermsLink = styled(Link)`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeights.medium};
`;

interface SignInFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: SignInFormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: SignInFormValues) => {
    // Store the form values in session storage to use in the next step
    sessionStorage.setItem('signupData', JSON.stringify({
      username: values.username,
      email: values.email,
      password: values.password,
    }));
    
    // Navigate to the next step (additional details form)
    navigate('/signin-details');
  };

  return (
    <Layout>
      <SignInContainer>
        <SignInCard>
          <Title>Create an Account</Title>
          <Text>Join Virtual Stylish to discover your perfect style</Text>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <StyledForm>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <StyledField
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Choose a username"
                    as={Input}
                  />
                  <ErrorMessage name="username" component={ErrorText} />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <StyledField
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    as={Input}
                  />
                  <ErrorMessage name="email" component={ErrorText} />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <StyledField
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    as={Input}
                  />
                  <ErrorMessage name="password" component={ErrorText} />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <StyledField
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    as={Input}
                  />
                  <ErrorMessage name="confirmPassword" component={ErrorText} />
                </FormGroup>
                
                <SignInButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Continue'}
                </SignInButton>
                
                <TermsText>
                  By signing up, you agree to our{' '}
                  <TermsLink to="/terms">Terms of Service</TermsLink> and{' '}
                  <TermsLink to="/privacy">Privacy Policy</TermsLink>
                </TermsText>
              </StyledForm>
            )}
          </Formik>
          
          <LoginText>
            Already have an account? <LoginLink to="/login">Sign in</LoginLink>
          </LoginText>
        </SignInCard>
      </SignInContainer>
    </Layout>
  );
};

export default SignInPage;