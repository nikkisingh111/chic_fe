import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import theme from '../styles/theme';
import { Card, Title, PrimaryButton, ErrorText, Text } from '../components/styled/Common';
import { FaUserGraduate, FaBriefcase, FaChild, FaQuestionCircle, FaFemale, FaMale, FaUser, FaCheck } from 'react-icons/fa';

// --- STYLED COMPONENTS (with new additions) ---

// This button is for options with text and an icon (e.g., Age, Gender, Occupation)
const OptionButton = styled.button<{ isSelected: boolean }>`
  border: 1px solid ${({ isSelected }) => (isSelected ? theme.colors.primary : theme.colors.secondary)};
  background-color: ${({ isSelected }) => (isSelected ? theme.colors.primary : theme.colors.white)};
  color: ${({ isSelected }) => (isSelected ? theme.colors.white : theme.colors.text)};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.sm};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: ${theme.fontSizes.small};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  min-height: 80px;

  &:hover {
    border-color: ${theme.colors.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

// --- NEW --- This button is for the larger, image-only options
const ImageOptionButton = styled.button<{ isSelected: boolean }>`
  border: 2px solid ${({ isSelected }) => (isSelected ? theme.colors.primary : 'transparent')};
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.xs};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.medium};
  
  &:hover {
    border-color: ${theme.colors.secondary};
  }

  img {
    width: 80px;  // Increased image width
    height: 80px; // Increased image height
    object-fit: contain;
    border-radius: ${theme.borderRadius.small};
  }
`;

// --- NEW --- This button is for the skin color swatches
const ColorButton = styled.button<{ color: string; isSelected: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 3px solid ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.white)};
  box-shadow: ${theme.shadows.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const DetailsCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  padding: ${theme.spacing.xl};
`;

const SectionRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SectionTitle = styled.h3`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};
  font-weight: ${theme.fontWeights.bold};
  text-transform: uppercase;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${theme.spacing.md};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.lg};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  font-size: ${theme.fontSizes.medium};
`;

// --- NEW --- Color array sorted from lightest to darkest
const skinTones = [
  "#e6c6bf", "#d4afa3", "#c5a691", "#be9d86", "#b1886c", 
  "#a87f64", "#946c51", "#876249", "#775741"
];


// --- MAIN COMPONENT ---
const SignInDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const step1Data = location.state?.step1Data;

  // --- UPDATED --- Added skin_colour to the state
  const [details, setDetails] = useState({
    age: '25-35',
    gender: 'Female',
    occupation: 'Working Professional',
    face_shape: 'Oval',
    body_shape: 'Rectangle',
    body_size: 'Average',
    skin_colour: skinTones[0], // Default to the lightest skin tone
  });

  const [error, setError] = useState<string | null>(null);

  if (!step1Data) {
    return <p>Please complete the first step of registration. <Link to="/signin">Go back</Link></p>;
  }

  const handleSelect = (field: string, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    const finalData = { ...step1Data, ...details };

    try {
      await axios.post('http://localhost:8000/api/signup', finalData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during sign up.');
      console.error('Signup error:', err);
    }
  };

  return (
    <Layout>
      <DetailsContainer>
        <DetailsCard>
          <Title>Your Body Profile</Title>
          <Text>This helps us personalize your style.</Text>

          {/* AGE */}
          <SectionRow>
            <SectionTitle>Age</SectionTitle>
            <OptionsGrid>
              {['<18', '18-25', '25-35', '36-45', '45+'].map(age => (
                <OptionButton key={age} isSelected={details.age === age} onClick={() => handleSelect('age', age)}>
                  <FaUser />
                  {age}
                </OptionButton>
              ))}
            </OptionsGrid>
          </SectionRow>

          {/* GENDER */}
          <SectionRow>
            <SectionTitle>Gender</SectionTitle>
            <OptionsGrid>
              <OptionButton isSelected={details.gender === 'Female'} onClick={() => handleSelect('gender', 'Female')}>
                <FaFemale /> Female
              </OptionButton>
              <OptionButton isSelected={details.gender === 'Male'} onClick={() => handleSelect('gender', 'Male')}>
                <FaMale /> Male
              </OptionButton>
            </OptionsGrid>
          </SectionRow>

          {/* OCCUPATION */}
          <SectionRow>
            <SectionTitle>What do you do?</SectionTitle>
            <OptionsGrid>
              <OptionButton isSelected={details.occupation === 'College Student'} onClick={() => handleSelect('occupation', 'College Student')}>
                <FaUserGraduate /> College Student
              </OptionButton>
              <OptionButton isSelected={details.occupation === 'Working Professional'} onClick={() => handleSelect('occupation', 'Working Professional')}>
                <FaBriefcase /> Working Professional
              </OptionButton>
              <OptionButton isSelected={details.occupation === 'School Student'} onClick={() => handleSelect('occupation', 'School Student')}>
                <FaChild /> School Student
              </OptionButton>
              <OptionButton isSelected={details.occupation === 'Other'} onClick={() => handleSelect('occupation', 'Other')}>
                <FaQuestionCircle /> Other
              </OptionButton>
            </OptionsGrid>
          </SectionRow>

          {/* --- UPDATED BODY SHAPE SECTION --- */}
          <SectionRow>
            <SectionTitle>Body Shape</SectionTitle>
            <OptionsGrid>
              {['Rectangle', 'Oval', 'Triangle', 'Trapezoid', 'V-shape'].map(shape => (
                // Using the new, larger, image-only button
                <ImageOptionButton key={shape} isSelected={details.body_shape === shape} onClick={() => handleSelect('body_shape', shape)}>
                  <img src={`/icons/body-shapes/${shape.toLowerCase()}.jpg`} alt={shape} />
                  {/* Text has been removed from here */}
                </ImageOptionButton>
              ))}
            </OptionsGrid>
          </SectionRow>

          {/* BODY SIZE */}
          <SectionRow>
            <SectionTitle>Body Size</SectionTitle>
            <OptionsGrid>
              {['Skinny', 'Average', 'Plus Size'].map(size => (
                <OptionButton key={size} isSelected={details.body_size === size} onClick={() => handleSelect('body_size', size)}>
                  {size}
                </OptionButton>
              ))}
            </OptionsGrid>
          </SectionRow>
          
          {/* --- UPDATED FACE SHAPE SECTION --- */}
          <SectionRow>
            <SectionTitle>Face Shape</SectionTitle>
            <OptionsGrid>
              {['Oval', 'Round', 'Square', 'Heart', 'Diamond'].map(shape => (
                 // Using the new, larger button but keeping the text
                <ImageOptionButton key={shape} isSelected={details.face_shape === shape} onClick={() => handleSelect('face_shape', shape)}>
                  <img src={`/icons/face-shapes/${shape.toLowerCase()}.jpg`} alt={shape} />
                  {shape} 
                </ImageOptionButton>
              ))}
            </OptionsGrid>
          </SectionRow>

          {/* --- NEW SKIN COLOUR SECTION --- */}
          <SectionRow>
            <SectionTitle>Skin Tone</SectionTitle>
            <OptionsGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))' }}>
              {skinTones.map(color => (
                <ColorButton 
                  key={color} 
                  color={color} 
                  isSelected={details.skin_colour === color} 
                  onClick={() => handleSelect('skin_colour', color)}
                >
                  {details.skin_colour === color && <FaCheck color="white" />}
                </ColorButton>
              ))}
            </OptionsGrid>
          </SectionRow>

          {error && <ErrorText>{error}</ErrorText>}

          <ButtonGroup>
            <BackButton onClick={() => navigate(-1)}>&larr; Back</BackButton>
            <PrimaryButton onClick={handleSubmit}>Finish Sign Up</PrimaryButton>
          </ButtonGroup>
        </DetailsCard>
      </DetailsContainer>
    </Layout>
  );
};

export default SignInDetailsPage;
