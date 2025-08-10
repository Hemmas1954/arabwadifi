import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Fab,
  Collapse,
  Chip,
  Divider
} from '@material-ui/core';
import {
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Android as BotIcon,
  Person as PersonIcon,
  Help as HelpIcon,
  MenuBook as BookIcon,
  Assessment as AnalyticsIcon,
  Create as CreateIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { getSmartResponse, getDailyTip, chatbotData } from './ChatbotData';
import './Chatbot.css';

const useStyles = makeStyles((theme) => ({
  chatbotContainer: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  chatWindow: {
    width: 380,
    height: 550,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 4px 20px rgba(212,165,116,0.3)',
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    border: '2px solid rgba(212,165,116,0.3)',
    backdropFilter: 'blur(10px)',
  },
  chatHeader: {
    background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)',
    padding: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#1B4E65',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  messagesContainer: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: 'auto',
    background: 'rgba(255,255,255,0.95)',
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#D4A574',
      borderRadius: 3,
    },
  },
  messageBox: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: theme.spacing(1.5, 2),
    borderRadius: 18,
    wordWrap: 'break-word',
    position: 'relative',
    boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
  },
  userBubble: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    borderBottomRightRadius: 6,
  },
  botBubble: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    color: '#333',
    borderBottomLeftRadius: 6,
    border: '2px solid rgba(212,165,116,0.3)',
  },
  inputContainer: {
    padding: theme.spacing(1.5),
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    borderTop: '2px solid rgba(212,165,116,0.2)',
    boxShadow: '0 -4px 15px rgba(0,0,0,0.1)',
  },
  chatFab: {
    background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)',
    color: '#1B4E65',
    width: 65,
    height: 65,
    boxShadow: '0 8px 25px rgba(212,165,116,0.4), 0 4px 15px rgba(0,0,0,0.3)',
    border: '3px solid rgba(255,255,255,0.2)',
    '&:hover': {
      background: 'linear-gradient(135deg, #FFD700 0%, #D4A574 100%)',
      transform: 'scale(1.1)',
      boxShadow: '0 12px 35px rgba(212,165,116,0.6), 0 6px 20px rgba(0,0,0,0.4)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
  quickActions: {
    padding: theme.spacing(1.5),
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.8),
    borderBottom: '1px solid rgba(212,165,116,0.2)',
  },
  quickActionChip: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    fontSize: '0.75rem',
    borderRadius: 20,
    boxShadow: '0 2px 8px rgba(27,78,101,0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)',
      color: '#1B4E65',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(212,165,116,0.4)',
    },
  },
  avatar: {
    width: 35,
    height: 35,
    margin: theme.spacing(0, 0.8),
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    border: '2px solid rgba(255,255,255,0.2)',
  },
  userAvatar: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
  },
  botAvatar: {
    background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)',
    color: '#1B4E65',
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    color: '#666',
    fontStyle: 'italic',
    background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
    borderRadius: 15,
    margin: theme.spacing(0.5),
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
}));

const Chatbot = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: chatbotData.welcomeMessages[0] + '\n\n' + getDailyTip(),
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = chatbotData.quickActions.map(action => ({
    ...action,
    icon: null
  }));

  const getBotResponse = (userMessage) => {
    return getSmartResponse(userMessage);
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (actionText) => {
    handleSendMessage(actionText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={classes.chatbotContainer}>
      <Collapse in={isOpen}>
        <Paper className={classes.chatWindow} elevation={4}>
          <div className={classes.chatHeader}>
            <Box display="flex" alignItems="center">
              <Avatar className={classes.botAvatar}>
                <BotIcon />
              </Avatar>
              <Box ml={1}>
                <Typography variant="h6" style={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}>
                  🤖 المساعد الذكي
                </Typography>
                <Typography variant="caption" style={{ 
                  fontSize: '0.8rem',
                  opacity: 0.8,
                  fontStyle: 'italic'
                }}>
                  ✨ متاح دائماً لمساعدتك
                </Typography>
              </Box>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setIsOpen(false)}
              style={{ color: '#1B4E65' }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div className={classes.quickActions}>
            {quickActions.map((action, index) => (
              <Chip
                key={index}
                icon={action.icon}
                label={action.text}
                onClick={() => handleQuickAction(action.text)}
                className={classes.quickActionChip}
                size="small"
                clickable
              />
            ))}
          </div>

          <Divider />

          <div className={classes.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${classes.messageBox} ${
                  message.sender === 'user' ? classes.userMessage : classes.botMessage
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className={`${classes.avatar} ${classes.botAvatar}`}>
                    <BotIcon fontSize="small" />
                  </Avatar>
                )}
                <div
                  className={`${classes.messageBubble} ${
                    message.sender === 'user' ? classes.userBubble : classes.botBubble
                  }`}
                >
                  <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    {message.text}
                  </Typography>
                </div>
                {message.sender === 'user' && (
                  <Avatar className={`${classes.avatar} ${classes.userAvatar}`}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className={`${classes.messageBox} ${classes.botMessage}`}>
                <Avatar className={`${classes.avatar} ${classes.botAvatar}`}>
                  <BotIcon fontSize="small" />
                </Avatar>
                <div className={classes.typingIndicator}>
                  <Typography variant="body2">
                    🤖 المساعد يكتب...
                  </Typography>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={classes.inputContainer}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="اكتب رسالتك هنا..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              multiline
              maxRows={3}
              style={{ direction: 'rtl' }}
            />
            <IconButton
              color="primary"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              style={{ 
                background: inputValue.trim() ? 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)' : 'transparent',
                color: inputValue.trim() ? '#1B4E65' : '#ccc'
              }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </Paper>
      </Collapse>

      <Fab
        className={classes.chatFab}
        onClick={() => setIsOpen(!isOpen)}
        size="large"
      >
        {isOpen ? <CloseIcon fontSize="large" /> : <BotIcon fontSize="large" />}
      </Fab>
    </div>
  );
};

export default Chatbot;