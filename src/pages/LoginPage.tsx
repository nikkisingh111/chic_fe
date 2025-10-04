import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
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

// Corrected the image path to use .jpg
const loginImage = '/images/login_page_image.png';

const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 300px);
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  padding: 0;
  display: flex;
  overflow: hidden;
  box-shadow: ${theme.shadows.large};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const LoginImageContainer = styled.div`
  flex: 1;
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const LoginImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
`;

const LoginFormContainer = styled.div`
  flex: 1;
  padding: ${theme.spacing.xl};
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

// --- FIX 1: REMOVED the problematic 'StyledField' component ---

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  margin-top: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.primary};
`;

const SignUpText = styled(Text)`
  text-align: center;
  margin-top: ${theme.spacing.lg};
`;

const SignUpLink = styled(Link)`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeights.medium};
`;

const LoginButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.md};
`;

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setLoginError(null);
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <Layout>
      <LoginContainer>
        <LoginCard>
          <LoginImageContainer>
            <LoginImage src={loginImage} alt="Login" />
          </LoginImageContainer>
          <LoginFormContainer>
            <Title>Welcome Back</Title>
            <Text>Sign in to your account to continue</Text>
            
            {loginError && <ErrorText>{loginError}</ErrorText>}
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <StyledForm>
                  {/* --- FIX 2: Replaced <StyledField> with <Field> --- */}
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Field
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
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      as={Input}
                    />
                    <ErrorMessage name="password" component={ErrorText} />
                    <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
                  </FormGroup>
                  
                  <LoginButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </LoginButton>
                </StyledForm>
              )}
            </Formik>
            
            <SignUpText>
              Don't have an account? <SignUpLink to="/signin">Sign up</SignUpLink>
            </SignUpText>
          </LoginFormContainer>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
};

export default LoginPage;