import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import {
  Container,
  Card,
  Title,
  Subtitle,
  Text,
  PrimaryButton,
  SecondaryButton,
  Input,
  TextArea,
  Label,
  FormGroup,
} from '../components/styled/Common';

const DashboardContainer = styled(Container)`
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 3fr 1fr;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FilterPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.lg};
  height: fit-content;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ChatPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.lg};
  height: 600px;
  max-height: 80vh;
`;

// Filter Panel Components
const FilterTitle = styled(Subtitle)`
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeights.bold};
`;

const FilterOption = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const FilterLabel = styled(Label)`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: ${theme.spacing.xs};
  font-weight: ${theme.fontWeights.medium};
`;

const RadioInput = styled.input`
  margin-right: ${theme.spacing.sm};
  cursor: pointer;
  accent-color: ${theme.colors.primary};
`;

// Outfit Display Components
const OutfitContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const OutfitTitle = styled(Subtitle)`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const OutfitRecommendations = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};
`;

// Clothing item components continued

// Clothing Item Components
const ClothingCombination = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.lg};
`;

const ClothingSection = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
`;

const AccessoriesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.sm};
`;

const AccessoryBox = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
`;

// Chat Components
const ChatHeader = styled.div`
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.background};
  margin-bottom: ${theme.spacing.md};
`;

const ChatTitle = styled(Subtitle)`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md} 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const Message = styled.div<{ isUser?: boolean }>`
  max-width: 80%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isUser ? theme.colors.primary : theme.colors.background};
  color: ${props => props.isUser ? theme.colors.white : theme.colors.text};
`;

const ChatInputContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: auto;
  border-top: 1px solid ${theme.colors.background};
  padding-top: ${theme.spacing.md};
`;

const OutfitCard = styled(Card)`
  padding: ${theme.spacing.lg};
`;

const OutfitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const OutfitItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  transition: transform ${theme.transitions.short} ease-in-out, box-shadow ${theme.transitions.short} ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const OutfitImage = styled.div`
  height: 200px;
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.secondary};
`;

const OutfitInfo = styled.div`
  padding: ${theme.spacing.md};
`;

const OutfitName = styled.h4`
  font-size: ${theme.fontSizes.medium};
  margin-bottom: ${theme.spacing.xs};
`;

const OutfitDescription = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.sm};
`;

const RecommendationCard = styled(Card)`
  padding: ${theme.spacing.lg};
`;

const RecommendationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const RecommendationTitle = styled.h4`
  padding: ${theme.spacing.md};
  margin: 0;
`;

const RecommendationDescription = styled.p`
  padding: 0 ${theme.spacing.md} ${theme.spacing.md};
  margin: 0;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.small};
`;

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('wardrobe');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{text: string; isUser: boolean}>>([]);
  
  // Mock data for recommendations
  
  // Recommendations
  const recommendations = [
    { id: 1, title: 'Casual Summer', description: 'Perfect for hot days' },
    { id: 2, title: 'Office Look', description: 'Professional attire' },
    { id: 3, title: 'Evening Style', description: 'For night events' },
    { id: 4, title: 'Weekend Casual', description: 'Relaxed weekend outfit' },
    { id: 5, title: 'Formal Event', description: 'For special occasions' },
  ];
  
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };
  
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const newUserMessage = { text: chatInput, isUser: true };
    setChatMessages([...chatMessages, newUserMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        text: `Here are some suggestions based on "${chatInput}"`, 
        isUser: false 
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setChatInput('');
  };
  
  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <DashboardContainer>
        <DashboardHeader>
          <Title>Your Style Dashboard</Title>
          <Text>Welcome back! Here's your personalized style information and recommendations.</Text>
        </DashboardHeader>
        
        <DashboardGrid>
          {/* Left Filter Panel */}
          <FilterPanel>
            <FilterTitle>Style Options</FilterTitle>
            
            <FilterOption>
              <FilterLabel>
                <RadioInput 
                  type="radio" 
                  name="filterOption" 
                  value="wardrobe" 
                  checked={selectedFilter === 'wardrobe'} 
                  onChange={() => handleFilterChange('wardrobe')} 
                />
                Wardrobe Fashion
              </FilterLabel>
            </FilterOption>
            
            <FilterOption>
              <FilterLabel>
                <RadioInput 
                  type="radio" 
                  name="filterOption" 
                  value="combine" 
                  checked={selectedFilter === 'combine'} 
                  onChange={() => handleFilterChange('combine')} 
                />
                Combine Fashion
              </FilterLabel>
            </FilterOption>
            
            <FilterOption>
              <FilterLabel>
                <RadioInput 
                  type="radio" 
                  name="filterOption" 
                  value="explore" 
                  checked={selectedFilter === 'explore'} 
                  onChange={() => handleFilterChange('explore')} 
                />
                Explore Fashion
              </FilterLabel>
            </FilterOption>
          </FilterPanel>
          
          {/* Middle Content Area */}
          <MainContent>
            {/* Clothing Combination Section */}
            <OutfitContainer>
              <OutfitTitle>Your Style Combinations</OutfitTitle>
              
              <ClothingCombination>
                {/* Upper Clothes */}
                <ClothingSection>
                  <h4>Upper Clothes</h4>
                </ClothingSection>
                
                {/* Bottom Clothes */}
                <ClothingSection>
                  <h4>Bottom Clothes</h4>
                </ClothingSection>
                
                {/* Accessories */}
                <AccessoriesSection>
                  <AccessoryBox>
                    <p>Wrist Accessories</p>
                  </AccessoryBox>
                  <AccessoryBox>
                    <p>Footwear</p>
                  </AccessoryBox>
                  <AccessoryBox>
                    <p>Belt/Jewelry</p>
                  </AccessoryBox>
                  <AccessoryBox>
                    <p>Other Accessories</p>
                  </AccessoryBox>
                </AccessoriesSection>
              </ClothingCombination>
              
              {/* Recommendations */}
               <OutfitTitle>Recommended Styles</OutfitTitle>
               <OutfitRecommendations>
                 <StyleGrid>
                   {recommendations.map(item => (
                     <OutfitCard key={item.id}>
                       <div style={{ height: '120px', backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.white }}>Style</div>
                       <RecommendationTitle>{item.title}</RecommendationTitle>
                       <RecommendationDescription>{item.description}</RecommendationDescription>
                     </OutfitCard>
                   ))}
                 </StyleGrid>
               </OutfitRecommendations>
            </OutfitContainer>
          </MainContent>
          
          {/* Right Chat Panel */}
          <ChatPanel>
            <ChatHeader>
              <ChatTitle>Style Assistant</ChatTitle>
            </ChatHeader>
            
            <ChatMessages>
              {chatMessages.length === 0 ? (
                <Message isUser={false}>
                  Hello! I'm your style assistant. How can I help you today?
                </Message>
              ) : (
                chatMessages.map((msg, index) => (
                  <Message key={index} isUser={msg.isUser}>
                    {msg.text}
                  </Message>
                ))
              )}
            </ChatMessages>
            
            <form onSubmit={handleChatSubmit}>
              <ChatInputContainer>
                <TextArea 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about style recommendations..."
                  rows={2}
                />
                <PrimaryButton type="submit">Send</PrimaryButton>
              </ChatInputContainer>
            </form>
          </ChatPanel>
        </DashboardGrid>
      </DashboardContainer>
    </Layout>
  );
};

export default DashboardPage;