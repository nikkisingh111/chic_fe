import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { Container, Title, Subtitle, Text } from '../components/styled/Common';

const AboutUsContainer = styled(Container)`
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const AboutUsHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const AboutUsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const AboutUsPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <AboutUsContainer>
        <AboutUsHeader>
          <Title>About Us</Title>
          <Text>Learn more about Virtual Stylish and our mission</Text>
        </AboutUsHeader>
        
        <AboutUsContent>
          <Section>
            <Subtitle>Our Story</Subtitle>
            <Text>
              This is a placeholder for the About Us page content. In a real implementation, 
              this would contain information about the company, its history, mission, and values.
            </Text>
          </Section>
          
          <Section>
            <Subtitle>Our Mission</Subtitle>
            <Text>
              This is a placeholder for the mission statement. In a real implementation, 
              this would describe the company's goals and purpose.
            </Text>
          </Section>
          
          <Section>
            <Subtitle>Our Team</Subtitle>
            <Text>
              This is a placeholder for team information. In a real implementation, 
              this would include details about key team members and their roles.
            </Text>
          </Section>
        </AboutUsContent>
      </AboutUsContainer>
    </Layout>
  );
};

export default AboutUsPage;