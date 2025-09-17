import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const DetailsContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 300px);
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const DetailsCard = styled(Card)`
  width: 100%;
  max-width: 700px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xs};
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

const SelectWrapper = styled.div`
  position: relative;
  
  &::after {
    content: '▼';
    font-size: 0.8em;
    position: absolute;
    right: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${theme.colors.secondary};
  }
`;

const StyledSelect = styled(Field)`
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

const SubmitButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
`;

interface SignInDetailsFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  stylePreference: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
  phoneNumber: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('ZIP code is required'),
  country: Yup.string().required('Country is required'),
  stylePreference: Yup.string().required('Style preference is required'),
});

const SignInDetailsPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<any>(null);

  useEffect(() => {
    // Retrieve the data from the previous step
    const storedData = sessionStorage.getItem('signupData');
    if (!storedData) {
      // If no data is found, redirect back to the signup page
      navigate('/signin');
      return;
    }
    
    setSignupData(JSON.parse(storedData));
  }, [navigate]);

  const initialValues: SignInDetailsFormValues = {
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    stylePreference: '',
  };

  const handleSubmit = async (values: SignInDetailsFormValues) => {
    try {
      if (signupData) {
        // Combine data from both forms
        const userData = {
          ...signupData,
          ...values,
        };
        
        // Format the data for the backend API
        const fullName = `${values.firstName} ${values.lastName}`;
        const dateOfBirth = new Date();
        dateOfBirth.setFullYear(new Date().getFullYear() - parseInt(values.age));
        
        // Call the signup function from the auth context with the required fields
        await signup(fullName, signupData.email, signupData.password);
        
        // Clear the session storage
        sessionStorage.removeItem('signupData');
        
        // Redirect to the dashboard page
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  if (!signupData) {
    return null; // Or a loading spinner
  }

  return (
    <Layout>
      <DetailsContainer>
        <DetailsCard>
          <Title>Complete Your Profile</Title>
          <Text>Tell us more about yourself to personalize your experience</Text>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <StyledForm>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <StyledField
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      as={Input}
                    />
                    <ErrorMessage name="firstName" component={ErrorText} />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <StyledField
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      as={Input}
                    />
                    <ErrorMessage name="lastName" component={ErrorText} />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label>Gender</Label>
                    <RadioGroup>
                      <RadioLabel>
                        <Field type="radio" name="gender" value="male" as={RadioInput} />
                        Male
                      </RadioLabel>
                      <RadioLabel>
                        <Field type="radio" name="gender" value="female" as={RadioInput} />
                        Female
                      </RadioLabel>
                      <RadioLabel>
                        <Field type="radio" name="gender" value="other" as={RadioInput} />
                        Other
                      </RadioLabel>
                    </RadioGroup>
                    <ErrorMessage name="gender" component={ErrorText} />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="age">Age</Label>
                    <StyledField
                      type="number"
                      id="age"
                      name="age"
                      placeholder="Enter your age"
                      as={Input}
                    />
                    <ErrorMessage name="age" component={ErrorText} />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <StyledField
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    as={Input}
                  />
                  <ErrorMessage name="phoneNumber" component={ErrorText} />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="address">Address</Label>
                  <StyledField
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    as={Input}
                  />
                  <ErrorMessage name="address" component={ErrorText} />
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="city">City</Label>
                    <StyledField
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                      as={Input}
                    />
                    <ErrorMessage name="city" component={ErrorText} />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="state">State/Province</Label>
                    <StyledField
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Enter your state/province"
                      as={Input}
                    />
                    <ErrorMessage name="state" component={ErrorText} />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <StyledField
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      placeholder="Enter your ZIP code"
                      as={Input}
                    />
                    <ErrorMessage name="zipCode" component={ErrorText} />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="country">Country</Label>
                    <SelectWrapper>
                      <StyledSelect as="select" id="country" name="country">
                        <option value="">Select your country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="IN">India</option>
                        {/* Add more countries as needed */}
                      </StyledSelect>
                    </SelectWrapper>
                    <ErrorMessage name="country" component={ErrorText} />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="stylePreference">Style Preference</Label>
                  <SelectWrapper>
                    <StyledSelect as="select" id="stylePreference" name="stylePreference">
                      <option value="">Select your style preference</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                      <option value="business">Business</option>
                      <option value="sporty">Sporty</option>
                      <option value="vintage">Vintage</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="bohemian">Bohemian</option>
                      <option value="streetwear">Streetwear</option>
                    </StyledSelect>
                  </SelectWrapper>
                  <ErrorMessage name="stylePreference" component={ErrorText} />
                </FormGroup>
                
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Complete Sign Up'}
                </SubmitButton>
              </StyledForm>
            )}
          </Formik>
        </DetailsCard>
      </DetailsContainer>
    </Layout>
  );
};

export default SignInDetailsPage;