import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import theme from '../styles/theme';
import { Card, Title, FormGroup, Label, Input, PrimaryButton, ErrorText, Text } from '../components/styled/Common';

const signinImage = '/images/signin_page_image.png';

interface SignInFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

// Styled-components for layout and styling
const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const SignInCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  padding: 0;
  display: flex;
  overflow: hidden;
  box-shadow: ${theme.shadows.large};
`;

const SignInImageContainer = styled.div`
  flex: 1;
  display: flex;
  @media (max-width: ${theme.breakpoints.md}) { display: none; }
`;

const SignInImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const SignInFormContainer = styled.div`
  flex: 1;
  padding: ${theme.spacing.xl};
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

// --- CHANGE 1: REMOVED the problematic 'StyledField' component ---
// We will now use the <Field> component from Formik directly.

const Button = styled(PrimaryButton)`
  width: 100%;
  margin-top: ${theme.spacing.md};
`;

const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone_number: Yup.string().required('Phone number is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match') // Updated to handle empty initial value
    .required('Please confirm your password'),
});

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: SignInFormValues) => {
    console.log('Form submitted successfully with these values:', values);
    navigate('/signin-details', { state: { step1Data: values } });
  };
  
  const initialValues: SignInFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  };

  return (
    <Layout>
      <SignInContainer>
        <SignInCard>
          <SignInImageContainer>
            <SignInImage src={signinImage} alt="Sign In" />
          </SignInImageContainer>
          <SignInFormContainer>
            <Title>Create Your Account</Title>
            <Text>Let's get started with your fashion journey.</Text>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <StyledForm>
                  {/* I have removed the <pre> debugging block as it's no longer needed */}
                  
                  {/* --- CHANGE 2: Replaced <StyledField> with <Field> throughout the form --- */}
                  <FormGroup>
                    <Label htmlFor="first_name">First Name</Label>
                    <Field type="text" id="first_name" name="first_name" as={Input} />
                    <ErrorMessage name="first_name" component={ErrorText} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Field type="text" id="last_name" name="last_name" as={Input} />
                    <ErrorMessage name="last_name" component={ErrorText} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Field type="email" id="email" name="email" as={Input} />
                    <ErrorMessage name="email" component={ErrorText} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Field type="tel" id="phone_number" name="phone_number" as={Input} />
                    <ErrorMessage name="phone_number" component={ErrorText} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Field type="password" id="password" name="password" as={Input} />
                    <ErrorMessage name="password" component={ErrorText} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Field type="password" id="confirm_password" name="confirm_password" as={Input} />
                    <ErrorMessage name="confirm_password" component={ErrorText} />
                  </FormGroup>
                  <Button type="submit" disabled={isSubmitting}>
                    Next Step
                  </Button>
                   <Text style={{ textAlign: 'center', marginTop: '1rem' }}>
                      Already have an account? <Link to="/login" style={{color: theme.colors.primary}}>Log In</Link>
                  </Text>
                </StyledForm>
              )}
            </Formik>
          </SignInFormContainer>
        </SignInCard>
      </SignInContainer>
    </Layout>
  );
};

export default SignInPage;