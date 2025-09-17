import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { Container, Title, Subtitle, Text } from '../components/styled/Common';

const ContactUsContainer = styled(Container)`
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const ContactUsHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const ContactUsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const ContactUsPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <ContactUsContainer>
        <ContactUsHeader>
          <Title>Contact Us</Title>
          <Text>Get in touch with our team</Text>
        </ContactUsHeader>
        
        <ContactUsContent>
          <Section>
            <Subtitle>Contact Information</Subtitle>
            <Text>
              This is a placeholder for the Contact Us page content. In a real implementation, 
              this would contain contact information such as email addresses, phone numbers, 
              and physical addresses.
            </Text>
          </Section>
          
          <Section>
            <Subtitle>Send Us a Message</Subtitle>
            <Text>
              This is a placeholder for a contact form. In a real implementation, 
              this would include a form for users to send messages to the company.
            </Text>
          </Section>
          
          <Section>
            <Subtitle>Visit Us</Subtitle>
            <Text>
              This is a placeholder for location information. In a real implementation, 
              this might include a map and directions to physical locations.
            </Text>
          </Section>
        </ContactUsContent>
      </ContactUsContainer>
    </Layout>
  );
};

export default ContactUsPage;