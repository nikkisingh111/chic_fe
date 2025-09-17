import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { Container, PrimaryButton, SecondaryButton, Title, Text } from '../components/styled/Common';

// Import images
const homeImage1 = '/images/home_image1.png';
const homeImage2 = '/images/home_image2.png';
const homeImage3 = '/images/home_image3.png';
const homeImage4 = '/images/home_image4.png';

const HeroSection = styled.section`
  background-color: ${theme.colors.cream};
  padding: ${theme.spacing.xxl} 0;
  margin-bottom: ${theme.spacing.xl};
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroText = styled.div`
  flex: 1;
`;

const HeroImage = styled.img`
  flex: 1;
  max-width: 500px;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing.xl} 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const FeatureCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.small};
  padding: ${theme.spacing.lg};
  transition: transform ${theme.transitions.medium} ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xlarge};
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.large};
  margin-bottom: ${theme.spacing.sm};
`;

const TestimonialsSection = styled.section`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.xl} 0;
  margin: ${theme.spacing.xl} 0;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const TestimonialCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.small};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: ${theme.spacing.md};
  flex: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const TestimonialAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: ${theme.spacing.sm};
  object-fit: cover;
`;

const TestimonialInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestimonialName = styled.span`
  font-weight: ${theme.fontWeights.bold};
`;

const TestimonialRole = styled.span`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.secondary};
`;

const CTASection = styled.section`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xl} 0;
  text-align: center;
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: ${theme.spacing.xl};
`;

const CTATitle = styled.h2`
  font-size: ${theme.fontSizes.xxlarge};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.white};
`;

const CTAText = styled.p`
  font-size: ${theme.fontSizes.large};
  margin-bottom: ${theme.spacing.lg};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroText>
              <Title>Discover Your Perfect Style</Title>
              <Text>
                Virtual Stylish helps you find the perfect outfit for any occasion. Our AI-powered
                platform analyzes your preferences and provides personalized style recommendations.
              </Text>
              <ButtonGroup>
                {isAuthenticated ? (
                  <PrimaryButton as={Link} to="/dashboard">
                    Go to Dashboard
                  </PrimaryButton>
                ) : (
                  <>
                    <PrimaryButton as={Link} to="/login">
                      Get Started
                    </PrimaryButton>
                    <SecondaryButton as={Link} to="/signup">
                      Sign Up
                    </SecondaryButton>
                  </>
                )}
              </ButtonGroup>
            </HeroText>
            <HeroImage src={homeImage1} alt="Virtual Stylish" />
          </HeroContent>
        </Container>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <Title style={{ textAlign: 'center' }}>Our Features</Title>
          <Text style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            Discover how Virtual Stylish can transform your wardrobe and style experience.
          </Text>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>👕</FeatureIcon>
              <FeatureTitle>Personalized Recommendations</FeatureTitle>
              <Text>
                Get clothing recommendations tailored to your body type, style preferences, and
                occasion.
              </Text>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🎨</FeatureIcon>
              <FeatureTitle>Color Coordination</FeatureTitle>
              <Text>
                Learn which colors work best for you and how to coordinate them for a cohesive look.
              </Text>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Style Dashboard</FeatureTitle>
              <Text>
                Track your style preferences and get insights on your fashion choices with our
                interactive dashboard.
              </Text>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>💼</FeatureIcon>
              <FeatureTitle>Occasion-Based Styling</FeatureTitle>
              <Text>
                Get outfit recommendations for specific occasions, from casual outings to formal
                events.
              </Text>
            </FeatureCard>
          </FeatureGrid>
        </Container>
      </FeaturesSection>

      <TestimonialsSection>
        <Container>
          <Title style={{ textAlign: 'center' }}>What Our Users Say</Title>
          <TestimonialGrid>
            <TestimonialCard>
              <TestimonialText>
                "Virtual Stylish completely transformed my wardrobe. I now feel confident in my style
                choices and receive compliments regularly!"
              </TestimonialText>
              <TestimonialAuthor>
                <TestimonialAvatar src={homeImage2} alt="Sarah J." />
                <TestimonialInfo>
                  <TestimonialName>Sarah J.</TestimonialName>
                  <TestimonialRole>Marketing Professional</TestimonialRole>
                </TestimonialInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>
                "As someone who always struggled with fashion, this app has been a game-changer. The
                personalized recommendations are spot on!"
              </TestimonialText>
              <TestimonialAuthor>
                <TestimonialAvatar src={homeImage3} alt="Michael T." />
                <TestimonialInfo>
                  <TestimonialName>Michael T.</TestimonialName>
                  <TestimonialRole>Software Engineer</TestimonialRole>
                </TestimonialInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>
                "I love how the app considers my body type and personal preferences. It's like having
                a personal stylist in my pocket!"
              </TestimonialText>
              <TestimonialAuthor>
                <TestimonialAvatar src={homeImage4} alt="Jessica L." />
                <TestimonialInfo>
                  <TestimonialName>Jessica L.</TestimonialName>
                  <TestimonialRole>Teacher</TestimonialRole>
                </TestimonialInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialGrid>
        </Container>
      </TestimonialsSection>

      <Container>
        <CTASection>
          <CTATitle>Ready to Transform Your Style?</CTATitle>
          <CTAText>
            Join thousands of satisfied users who have discovered their perfect style with Virtual
            Stylish. Sign up today and start your style journey!
          </CTAText>
          {!isAuthenticated && (
            <PrimaryButton
              as={Link}
              to="/signup"
              style={{ backgroundColor: theme.colors.white, color: theme.colors.primary }}
            >
              Sign Up Now
            </PrimaryButton>
          )}
        </CTASection>
      </Container>
    </Layout>
  );
};

export default HomePage;