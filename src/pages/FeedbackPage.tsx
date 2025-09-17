import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { Container, Title, Subtitle, Text, PrimaryButton, Input, TextArea } from '../components/styled/Common';

const FeedbackContainer = styled(Container)`
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const FeedbackHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const FeedbackContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  max-width: 600px;
  margin: 0 auto;
`;

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing.xs};
`;

const RadioGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.xs};
  }
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const SuccessMessage = styled.div`
  background-color: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
  margin-top: ${theme.spacing.md};
`;

const FeedbackPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the feedback data to a server
    setSubmitted(true);
  };

  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <FeedbackContainer>
        <FeedbackHeader>
          <Title>Feedback</Title>
          <Text>We value your feedback to improve our services</Text>
        </FeedbackHeader>
        
        <FeedbackContent>
          {submitted ? (
            <SuccessMessage>
              <Subtitle>Thank You!</Subtitle>
              <Text>Your feedback has been submitted successfully. We appreciate your input!</Text>
            </SuccessMessage>
          ) : (
            <FeedbackForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  placeholder="Your name"
                  defaultValue={user?.username || ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Your email address"
                  defaultValue={user?.email || ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>How satisfied are you with our service?</Label>
                <RadioGroup>
                  <RadioOption>
                    <Input type="radio" id="very-satisfied" name="satisfaction" value="very-satisfied" required />
                    <Label htmlFor="very-satisfied">Very Satisfied</Label>
                  </RadioOption>
                  <RadioOption>
                    <Input type="radio" id="satisfied" name="satisfaction" value="satisfied" />
                    <Label htmlFor="satisfied">Satisfied</Label>
                  </RadioOption>
                  <RadioOption>
                    <Input type="radio" id="neutral" name="satisfaction" value="neutral" />
                    <Label htmlFor="neutral">Neutral</Label>
                  </RadioOption>
                  <RadioOption>
                    <Input type="radio" id="unsatisfied" name="satisfaction" value="unsatisfied" />
                    <Label htmlFor="unsatisfied">Unsatisfied</Label>
                  </RadioOption>
                  <RadioOption>
                    <Input type="radio" id="very-unsatisfied" name="satisfaction" value="very-unsatisfied" />
                    <Label htmlFor="very-unsatisfied">Very Unsatisfied</Label>
                  </RadioOption>
                </RadioGroup>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="feedback">Your Feedback</Label>
                <TextArea 
                  id="feedback" 
                  placeholder="Please share your thoughts, suggestions, or concerns"
                  rows={5}
                  required
                />
              </FormGroup>
              
              <PrimaryButton type="submit">Submit Feedback</PrimaryButton>
            </FeedbackForm>
          )}
        </FeedbackContent>
      </FeedbackContainer>
    </Layout>
  );
};

export default FeedbackPage;