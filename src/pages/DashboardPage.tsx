import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  TextArea,
} from '../components/styled/Common';

// --- STYLED COMPONENTS (with layout adjustments) ---

const DashboardContainer = styled(Container)`
  padding: ${theme.spacing.lg} ${theme.spacing.md};
`;

const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

// --- CHANGE 1: Updated grid to a 2-column layout ---
const DashboardGrid = styled.div`
  display: grid;
  // Layout is now 2 columns: main content and chat panel
  grid-template-columns: 2fr 1.2fr;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    // On mobile, it stacks to a single column
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

// --- CHANGE 2: Adjusted chat panel height ---
const ChatPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.lg};
  // Set a fixed height that is not too large
  height: 650px;
  // Ensure it doesn't get excessively tall on large monitors
  max-height: 80vh; 
  // Ensures chat panel stays in place when scrolling the page
  position: sticky;
  top: ${theme.spacing.lg};
`;

const OutfitContainer = styled(Card)`
  padding: ${theme.spacing.lg};
`;

const OutfitTitle = styled(Subtitle)`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const ClothingCombination = styled(Card)`
  padding: ${theme.spacing.lg};
  display: grid;
  grid-template-rows: 1fr 1fr auto;
  gap: ${theme.spacing.md};
`;

const ClothingSection = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  color: ${theme.colors.secondary};
`;

const AccessoriesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: ${theme.spacing.sm};
`;

const AccessoryBox = styled(ClothingSection)`
  min-height: 80px;
  text-align: center;
`;

const ChatHeader = styled.div`
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.background};
  margin-bottom: ${theme.spacing.md};
`;

const ChatTitle = styled(Subtitle)`
  color: ${theme.colors.primary};
  margin: 0;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md} 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Message = styled.div<{ isUser?: boolean }>`
  max-width: 85%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isUser ? theme.colors.primary : theme.colors.background};
  color: ${props => props.isUser ? theme.colors.white : theme.colors.text};
  word-break: break-word;
  white-space: pre-wrap;
`;

const ChatInputContainer = styled.form`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: auto;
  border-top: 1px solid ${theme.colors.background};
  padding-top: ${theme.spacing.md};
`;

const RecommendationCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const RecommendationImage = styled.div`
  height: 120px;
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
`;

const RecommendationTitle = styled.h4`
  padding: ${theme.spacing.md} ${theme.spacing.md} 0;
  margin: 0;
`;

const RecommendationDescription = styled.p`
  padding: 0 ${theme.spacing.md} ${theme.spacing.md};
  margin: 0;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.small};
`;

// --- MAIN DASHBOARD COMPONENT ---

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isBotTyping]);

  const recommendations = [
    { id: 1, title: 'Casual Summer', description: 'Perfect for hot days' },
    { id: 2, title: 'Office Look', description: 'Professional attire' },
    { id: 3, title: 'Evening Style', description: 'For night events' },
    { id: 4, title: 'Weekend Casual', description: 'Relaxed weekend outfit' },
  ];

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isBotTyping) return;

    const newUserMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    setIsBotTyping(true);

    try {
      const response = await axios.post('http://localhost:8000/api/chat', {
        message: chatInput,
      });

      const botResponseData = JSON.parse(response.data.response);
      const botMessage = {
        text: botResponseData.assistant_response,
        isUser: false,
      };
      setChatMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat API error:', error);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <DashboardContainer>
        <DashboardHeader>
          <Title>Your Style Dashboard</Title>
          <Text>Welcome back! Here are your personalized style recommendations.</Text>
        </DashboardHeader>
        
        <DashboardGrid>
          {/* --- CHANGE 3: The FilterPanel component has been completely removed --- */}
          
          {/* Middle Content Area */}
          <MainContent>
            <ClothingCombination>
              <ClothingSection><h4>Upper Clothes</h4></ClothingSection>
              <ClothingSection><h4>Bottom Clothes</h4></ClothingSection>
              <AccessoriesSection>
                <AccessoryBox><p>Wrist</p></AccessoryBox>
                <AccessoryBox><p>Footwear</p></AccessoryBox>
                <AccessoryBox><p>Belt/Jewelry</p></AccessoryBox>
                <AccessoryBox><p>Other</p></AccessoryBox>
              </AccessoriesSection>
            </ClothingCombination>

            <OutfitContainer>
              <OutfitTitle>Recommended Styles</OutfitTitle>
              <StyleGrid>
                {recommendations.map(item => (
                  <RecommendationCard key={item.id}>
                    <RecommendationImage>Style</RecommendationImage>
                    <RecommendationTitle>{item.title}</RecommendationTitle>
                    <RecommendationDescription>{item.description}</RecommendationDescription>
                  </RecommendationCard>
                ))}
              </StyleGrid>
            </OutfitContainer>
          </MainContent>
          
          {/* Right Chat Panel */}
          <ChatPanel>
            <ChatHeader>
              <ChatTitle>Style Assistant</ChatTitle>
            </ChatHeader>
            
            <ChatMessages>
              {chatMessages.length === 0 && (
                <Message>Hello! Ask me for style advice.</Message>
              )}
              {chatMessages.map((msg, index) => (
                <Message key={index} isUser={msg.isUser}>{msg.text}</Message>
              ))}
              {isBotTyping && <Message>Typing...</Message>}
              <div ref={chatEndRef} />
            </ChatMessages>
            
            <ChatInputContainer onSubmit={handleChatSubmit}>
              <TextArea 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for style advice..."
                rows={2}
                disabled={isBotTyping}
              />
              <PrimaryButton type="submit" disabled={isBotTyping}>Send</PrimaryButton>
            </ChatInputContainer>
          </ChatPanel>
        </DashboardGrid>
      </DashboardContainer>
    </Layout>
  );
};

export default DashboardPage;

