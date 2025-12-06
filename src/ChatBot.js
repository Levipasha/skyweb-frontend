import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = ({ isMobile = false, isOpen: externalIsOpen = false, onToggle: externalOnToggle = null }) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your SkyWeb Private Limited assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Site data for chatbot responses
  const siteData = {
    services: [
      "Web Development - Modern, responsive websites built with cutting-edge technologies",
      "Mobile Apps - iOS, Android, and cross-platform mobile applications",
      "College Projects - Expert assistance with academic projects from concept to completion",
      "IT Services - Comprehensive IT solutions including consulting, maintenance, cloud services",
      "Custom Solutions - E-commerce platforms, CRM systems, API development, and more"
    ],
    technologies: [
      "React, React Native, Node.js, Express.js",
      "MongoDB, PostgreSQL, Firebase",
      "AWS, Google Cloud, Azure",
      "TypeScript, JavaScript, Python"
    ],
    company: {
      name: "SkyWeb Private Limited",
      mission: "We scale what others only dream of",
      description: "We build creative, powerful, and scalable web solutions designed to help businesses grow online. We specialize in MERN stack development, modern UI/UX design, and custom software solutions."
    },
    contact: {
      phone: "+91 99129 37061",
      email: "info@skyweb.in",
      website: "https://www.skyweb.in"
    }
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to SkyWeb Private Limited! I'm here to help you learn about our services. What would you like to know?";
    }
    
    // Services queries
    if (message.includes('service') || message.includes('what do you do') || message.includes('offer')) {
      return `We offer several amazing services:\n\n${siteData.services.map((service, index) => `${index + 1}. ${service}`).join('\n')}\n\nWhich service interests you most?`;
    }
    
    // Technology queries
    if (message.includes('technology') || message.includes('tech stack') || message.includes('use')) {
      return `We use modern technologies to build amazing solutions:\n\n${siteData.technologies.join('\n')}\n\nWe stay updated with the latest tools and frameworks to deliver the best results!`;
    }
    
    // Company info
    if (message.includes('company') || message.includes('about') || message.includes('who are you')) {
      return `We are ${siteData.company.name}! ${siteData.company.description}\n\nOur mission: "${siteData.company.mission}"\n\nWe help businesses transform their digital presence with innovation, precision, and style.`;
    }
    
    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "Our pricing varies based on project requirements and complexity. For a detailed quote, please contact us directly. We offer competitive rates and transparent pricing!";
    }
    
    // Contact info
    if (message.includes('contact') || message.includes('reach') || message.includes('phone') || message.includes('email')) {
      return `You can reach us through:\n\n📞 Phone: ${siteData.contact.phone}\n📧 Email: ${siteData.contact.email}\n🌐 Website: ${siteData.contact.website}\n\nWe're always happy to help!`;
    }
    
    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return "We've worked on various projects including e-commerce platforms, mobile apps, college projects, and enterprise solutions. Each project is unique and tailored to our client's needs. Would you like to discuss your specific project requirements?";
    }
    
    // Help
    if (message.includes('help') || message.includes('support')) {
      return "I'm here to help! You can ask me about:\n• Our services\n• Technologies we use\n• Company information\n• Contact details\n• Pricing\n• Project examples\n\nWhat would you like to know?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! Could you tell me more about what you're looking for?",
      "I'd be happy to help with that! Let me know more details about your project.",
      "Great question! We specialize in web development, mobile apps, and custom solutions. What specific service interests you?",
      "I understand you're looking for information. Feel free to ask about our services, technologies, or how we can help your business!",
      "That sounds exciting! We love working on new projects. What type of solution are you planning to build?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (externalOnToggle) {
      externalOnToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  // Sync external state with internal state
  useEffect(() => {
    setIsOpen(externalIsOpen);
  }, [externalIsOpen]);

  const showFloatingButton = screenSize <= 768 || isMobile || isOpen;

  return (
    <>
      {/* Chat Button - Show on mobile or when opened via ScrollLottie */}
      {showFloatingButton && (
        <div className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        <div className="chatbot-character">
          {/* Chatbot Character */}
          <div className="character-body">
            {/* Head */}
            <div className="character-head">
              <div className="character-face">
                <div className="character-eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="character-mouth"></div>
              </div>
              {/* Headset */}
              <div className="character-headset">
                <div className="headset-band"></div>
                <div className="microphone"></div>
              </div>
              {/* Antennae */}
              <div className="character-antennae">
                <div className="antenna left"></div>
                <div className="antenna right"></div>
              </div>
            </div>
            
            {/* Body */}
            <div className="character-torso">
              <div className="character-arms">
                <div className="arm left"></div>
                <div className="arm right"></div>
              </div>
            </div>
            
            {/* Base */}
            <div className="character-base"></div>
          </div>
          
          {/* Speech Bubble */}
          {!isOpen && (
            <div className="speech-bubble">
              <span>!</span>
            </div>
          )}
          
          {/* Glow Effect */}
          <div className="character-glow"></div>
        </div>
      </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="chatbot-info">
              <h3>SkyWeb Private Limited Assistant</h3>
              <p>Online now</p>
            </div>
            <button className="chatbot-close" onClick={toggleChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isBot ? 'bot' : 'user'}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chatbot-text-input"
            />
            <button onClick={handleSendMessage} className="chatbot-send-btn" disabled={!inputValue.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
