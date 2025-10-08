import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  TextArea,
} from '../components/styled/Common';

// --- TYPES ---

interface Item {
  item_type: string;
  title: string;
  price: string;
  link: string;
  image_url: string;
}

interface Outfit {
  outfit_name: string;
  items: Item[];
}

// --- STYLED COMPONENTS ---

const DashboardContainer = styled(Container)`
  padding: ${theme.spacing.lg} ${theme.spacing.md};
`;
const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: ${theme.spacing.lg};
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;
const ChatPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.lg};
  height: 650px;
  max-height: 80vh; 
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
  grid-template-rows: repeat(3, 1fr);
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
  overflow-x: auto;
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
  padding: ${theme.spacing.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;
const RecommendationImagePlaceholder = styled.div`
  height: 120px;
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
`;
const RecommendationTitle = styled.h4`
  padding: 0;
  margin: 0;
  color: ${theme.colors.primary};
`;
const RecommendationDescription = styled.p`
  padding: 0;
  margin: 0;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.small};
`;

const ClothingImageGrid = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  padding: 0 ${theme.spacing.sm};
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const ItemThumbnail = styled.img`
  height: 80px;
  width: auto;
  max-width: 80px;
  border-radius: ${theme.borderRadius.small};
  object-fit: cover;
  background-color: ${theme.colors.white};
`;

const ProductLinkButton = styled(PrimaryButton).attrs({ as: 'a' })`
  text-decoration: none;
  text-align: center;
  margin-top: ${theme.spacing.sm};
  width: 100%;
`;


// --- MAIN DASHBOARD COMPONENT ---

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [chatId] = useState(() => crypto.randomUUID());
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
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

  const groupedItems = useMemo(() => {
    if (!outfits || outfits.length === 0) {
      return { 'Upper-Wear': [], 'Lower-Wear': [], 'Footwear': [] };
    }
    const allItems = outfits.flatMap(outfit => outfit.items);
    return {
      'Upper-Wear': allItems.filter(item => item.item_type === 'Upper-Wear'),
      'Lower-Wear': allItems.filter(item => item.item_type === 'Lower-Wear'),
      'Footwear': allItems.filter(item => item.item_type === 'Footwear'),
    };
  }, [outfits]);


  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isBotTyping || !user) return;

    const newUserMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, newUserMessage]);
    const currentInput = chatInput;
    setChatInput('');
    setIsBotTyping(true);
    setOutfits([]);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          message: currentInput,
          email: user.email,
          chat_id: chatId,
        }),
      });

      if (!response.body) return;

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let isFirstChunk = true;

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setIsBotTyping(false);
          break;
        }

        const chunks = value.split('\n\n').filter(chunk => chunk.startsWith('data:'));

        for (const chunk of chunks) {
          try {
            const jsonString = chunk.substring(5);
            if (!jsonString) continue;
            const data = JSON.parse(jsonString);

            if (data.status === 'complete') {
                setIsBotTyping(false);
                continue;
            }
            
            let currentBotMessage = '';
            
            try {
                const parsedContent = JSON.parse(data.content);
                if (parsedContent && Array.isArray(parsedContent.outfits)) {
                    setOutfits(parsedContent.outfits);
                    currentBotMessage = parsedContent.chat_response;
                }
            } catch {
                currentBotMessage = data.content;
            }

            if (isFirstChunk) {
              setChatMessages(prev => [...prev, { text: currentBotMessage, isUser: false }]);
              isFirstChunk = false;
            } else {
              setChatMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && !lastMessage.isUser) {
                  lastMessage.text = currentBotMessage;
                }
                return newMessages;
              });
            }
          } catch (e) {
            console.error("Error parsing stream chunk", e);
          }
        }
      }

    } catch (error) {
      console.error('Chat API error:', error);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again.",
        isUser: false,
      };
      setChatMessages(prev => [...prev, errorMessage]);
      setIsBotTyping(false);
    }
  };

  return (
    <Layout isLoggedIn={isAuthenticated} username={user?.username}>
      <DashboardContainer>
        <DashboardHeader>
          <Title>Your Style Dashboard</Title>
          <Text>Welcome back, {user?.username}! Here are your personalized style recommendations.</Text>
        </DashboardHeader>
        
        <DashboardGrid>
          <MainContent>
            <ClothingCombination>
              <ClothingSection>
                {groupedItems['Upper-Wear'].length > 0 ? (
                  <ClothingImageGrid>
                    {groupedItems['Upper-Wear'].map((item, index) => (
                      <ItemThumbnail key={`${item.title}-${index}`} src={item.image_url} alt={item.title} />
                    ))}
                  </ClothingImageGrid>
                ) : (
                  <h4>Upper Clothes</h4>
                )}
              </ClothingSection>
              <ClothingSection>
                {groupedItems['Lower-Wear'].length > 0 ? (
                  <ClothingImageGrid>
                    {groupedItems['Lower-Wear'].map((item, index) => (
                      <ItemThumbnail key={`${item.title}-${index}`} src={item.image_url} alt={item.title} />
                    ))}
                  </ClothingImageGrid>
                ) : (
                  <h4>Bottom Clothes</h4>
                )}
              </ClothingSection>
              <ClothingSection>
                {groupedItems['Footwear'].length > 0 ? (
                  <ClothingImageGrid>
                    {groupedItems['Footwear'].map((item, index) => (
                      <ItemThumbnail key={`${item.title}-${index}`} src={item.image_url} alt={item.title} />
                    ))}
                  </ClothingImageGrid>
                ) : (
                  <h4>Footwear</h4>
                )}
              </ClothingSection>
            </ClothingCombination>
            
            <OutfitContainer>
              <OutfitTitle>Recommended Styles</OutfitTitle>
              <StyleGrid>
                {outfits.length > 0 ? (
                  outfits.map((outfit: Outfit, outfitIndex: number) => (
                    <RecommendationCard key={outfitIndex}>
                      <RecommendationTitle>{outfit.outfit_name}</RecommendationTitle>
                      {outfit.items.map((item: Item, itemIndex: number) => (
                        <div key={itemIndex} style={{ textAlign: 'center' }}>
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <Text style={{ marginTop: '8px', fontWeight: 'bold' }}>{item.title}</Text>
                          <Text>{item.price}</Text>
                          {item.link && item.link !== '#' && (
                             <ProductLinkButton 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                View Product
                              </ProductLinkButton>
                          )}
                        </div>
                      ))}
                    </RecommendationCard>
                  ))
                ) : (
                  recommendations.map(item => (
                    <RecommendationCard key={item.id}>
                       <RecommendationImagePlaceholder>Style</RecommendationImagePlaceholder>
                      <RecommendationTitle>{item.title}</RecommendationTitle>
                      <RecommendationDescription>{item.description}</RecommendationDescription>
                    </RecommendationCard>
                  ))
                )}
              </StyleGrid>
            </OutfitContainer>
          </MainContent>
          
          <ChatPanel>
            <ChatHeader>
              <ChatTitle>Style Assistant</ChatTitle>
            </ChatHeader>
            <ChatMessages>
              {chatMessages.length === 0 && (
                <Message>Hello! Ask me for style advice, like "What should I wear to a beach party?"</Message>
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