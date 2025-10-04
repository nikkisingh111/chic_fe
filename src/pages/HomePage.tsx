import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { Container, PrimaryButton, SecondaryButton, Title, Text } from '../components/styled/Common';

// An array of the hero images for easy shuffling
const heroImages = [
    '/images/home_image1.png',
    '/images/home_image2.png',
    '/images/home_image3.png',
    '/images/home_image4.png',
];

// A data array for the testimonials section for easier management
const testimonials = [
    {
        quote: "CHIC completely transformed my wardrobe. I now feel confident in my style choices and receive compliments regularly!",
        avatar: '/images/sarah.png', // Assumes a new portrait image
        name: 'Sarah J.',
        role: 'Marketing Professional',
    },
    {
        quote: "As someone who always struggled with fashion, this app has been a game-changer. The personalized recommendations are spot on!",
        avatar: '/images/michael.png', // Assumes a new portrait image
        name: 'Michael T.',
        role: 'Software Engineer',
    },
    {
        quote: "I love how the app considers my body type and personal preferences. It's like having a personal stylist in my pocket!",
        avatar: '/images/jessica.png', // Assumes a new portrait image
        name: 'Jessica L.',
        role: 'Teacher',
    }
];


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

const HeroImageSlider = styled.div`
  flex: 1;
  max-width: 500px;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  overflow: hidden; /* This hides the other images */

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const HeroImageTrack = styled.div`
  display: flex;
  transition: transform 0.8s ease-in-out; /* Controls the smooth slide */
`;

const HeroImage = styled.img`
  width: 100%;      /* Each image takes the full width of the slider */
  flex-shrink: 0;   /* Prevents images from shrinking */
  object-fit: cover;
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroText>
              <Title>Discover Your Perfect Style</Title>
              <Text>
                CHIC helps you find the perfect outfit for any occasion. Our AI-powered
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
                    {/* --- FIX 1: Corrected link from "/signup" to "/signin" --- */}
                    <SecondaryButton as={Link} to="/signin">
                      Sign Up
                    </SecondaryButton>
                  </>
                )}
              </ButtonGroup>
            </HeroText>
            <HeroImageSlider>
              <HeroImageTrack style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                {heroImages.map((src) => (
                  <HeroImage key={src} src={src} alt="CHIC" />
                ))}
              </HeroImageTrack>
            </HeroImageSlider>
          </HeroContent>
        </Container>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <Title style={{ textAlign: 'center' }}>Our Features</Title>
          <Text style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            Discover how CHIC can transform your wardrobe and style experience.
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
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <TestimonialText>
                  "{testimonial.quote}"
                </TestimonialText>
                <TestimonialAuthor>
                  <TestimonialAvatar src={testimonial.avatar} alt={testimonial.name} />
                  <TestimonialInfo>
                    <TestimonialName>{testimonial.name}</TestimonialName>
                    <TestimonialRole>{testimonial.role}</TestimonialRole>
                  </TestimonialInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
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
              // --- FIX 2: Corrected link from "/signup" to "/signin" ---
              to="/signin"
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