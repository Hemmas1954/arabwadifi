import React, { useState, useEffect } from 'react';
import { 
  makeStyles, 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Fade, 
  Grow,
  Zoom,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ExitPage from "./Exit3.jpg";
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import FlareIcon from '@material-ui/icons/Flare';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(138, 43, 226, 0.8) 0%, rgba(75, 0, 130, 0.9) 50%, rgba(25, 25, 112, 0.8) 100%), url(${ExitPage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(4, 0),
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontWeight: 800,
    textShadow: '3px 3px 12px rgba(0,0,0,0.5)',
    fontSize: '3.5rem',
    marginBottom: theme.spacing(6),
    fontFamily: '"Amiri", "Tajawal", serif',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.8rem',
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem',
      marginBottom: theme.spacing(3),
    },
  },
  inspirationCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 20,
    marginBottom: theme.spacing(4),
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
  },
  inspirationHeader: {
    background: 'linear-gradient(135deg, #8A2BE2 0%, #9932CC 100%)',
    color: 'white',
    padding: theme.spacing(2.5, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '10px solid #9932CC',
    },
  },
  inspirationTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    fontFamily: '"Amiri", "Tajawal", serif',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  inspirationIcon: {
    marginLeft: theme.spacing(2),
    fontSize: '2.5rem',
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
  },
  inspirationContent: {
    padding: theme.spacing(4, 3),
    textAlign: 'center',
  },
  inspirationText: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#2C3E50',
    lineHeight: 2,
    fontFamily: '"Tajawal", "Cairo", serif',
    textAlign: 'center',
    letterSpacing: '0.5px',
    '& .highlight': {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 700,
    },
  },
  authorCard: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    borderRadius: 16,
    padding: theme.spacing(3),
    textAlign: 'center',
    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  authorText: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#FFFFFF',
    fontFamily: '"Amiri", "Tajawal", serif',
    textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
    letterSpacing: '1px',
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
  },
  floatingShape: {
    position: 'absolute',
    background: 'rgba(255, 215, 0, 0.1)',
    borderRadius: '50%',
    animation: '$float 20s ease-in-out infinite',
    '&:nth-child(1)': {
      width: 120,
      height: 120,
      top: '10%',
      left: '5%',
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      width: 80,
      height: 80,
      top: '20%',
      right: '8%',
      animationDelay: '7s',
    },
    '&:nth-child(3)': {
      width: 100,
      height: 100,
      bottom: '25%',
      left: '12%',
      animationDelay: '14s',
    },
    '&:nth-child(4)': {
      width: 60,
      height: 60,
      bottom: '10%',
      right: '15%',
      animationDelay: '21s',
    },
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
      opacity: 0.3,
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
      opacity: 0.6,
    },
  },
  sparkle: {
    position: 'absolute',
    color: '#FFD700',
    animation: '$sparkle 3s ease-in-out infinite',
    '&:nth-child(odd)': {
      animationDelay: '1s',
    },
  },
  '@keyframes sparkle': {
    '0%, 100%': {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
  backButton: {
    position: 'fixed',
    top: theme.spacing(3),
    left: theme.spacing(3),
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
    color: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: '50%',
    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.1)',
      boxShadow: '0 15px 40px rgba(255, 215, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 50%, #FFEB3B 100%)',
    },
    '&:active': {
      transform: 'translateY(-2px) scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const ExitApp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationDelay(prev => prev + 200);
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const inspirations = [
    {
      title: 'نور...',
      icon: <WbSunnyIcon />,
      content: 'أجل... أَضِئ نور تلك الفكرة التي في عقلك... حتى تكون سبباً في حياة ذكرك...',
      delay: 0
    },
    {
      title: 'طفل...',
      icon: <FavoriteIcon />,
      content: 'ذلك الطفل الذي يقف أمامك الآن... علّمه شيئاً جميلاً، قدّم له هديةً بسيطة... سِرْ في دَرْبِك ولا تنظر خَلْفَك...',
      delay: 200
    },
    {
      title: 'همسٌ داخلي...',
      icon: <EmojiObjectsIcon />,
      content: 'اتْبَع صوتك الداخلي... ذلك الصوت الذي يحمل أماناً... دافعاً نحو الخير... اركض خلفه وافعل ما يُخبرك أنه يجب عليك فعله...',
      delay: 400
    },
    {
      title: 'بسمة...',
      icon: <EmojiEmotionsIcon />,
      content: 'ابتسم... الوردة التي تراها الآن... النبتة التي تسقيها... قطع الخبز التي تقدمها للحمام... قطعة الشكولاتة التي بين يديك... الكتاب الذي تقرأه... إحساس الحب بين ضلوعك... سببٌ كافٍ لأن تكون متفائلاً مبتسماً...',
      delay: 600
    },
    {
      title: 'مشكلة...',
      icon: <FlareIcon />,
      content: 'مشكلةٌ هي إن لم تشعر بالسعادة والامتنان... عند وقوعك في مشكلة...',
      delay: 800
    },
    {
      title: 'خيانة جميلة...',
      icon: <StarIcon />,
      content: 'خُن من تحب... مع ذاته... بقدرٍ أكبر مما سبق... تأمّل... كن ممتناً... عش بسيطاً... كن سعيداً... كل شيء سيزول...',
      delay: 1000
    }
  ];

  return (
    <div className={classes.root}>
      {/* زر العودة */}
      <Fade in={true} timeout={800}>
        <Tooltip title="العودة للصفحة السابقة" placement="right">
          <IconButton 
            onClick={handleGoBack} 
            className={classes.backButton} 
            aria-label="back"
          >
            <ArrowBackIcon style={{ fontSize: '2rem' }} />
          </IconButton>
        </Tooltip>
      </Fade>

      {/* العناصر المتحركة في الخلفية */}
      <div className={classes.floatingElements}>
        <div className={classes.floatingShape}></div>
        <div className={classes.floatingShape}></div>
        <div className={classes.floatingShape}></div>
        <div className={classes.floatingShape}></div>
      </div>

      <Container maxWidth="md" className={classes.container}>
        <Zoom in={true} timeout={1500}>
          <Typography variant="h1" className={classes.pageTitle} dir="rtl">
            كلمات من القلب
            <StarIcon 
              className={classes.sparkle} 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '20px',
                fontSize: '2rem'
              }} 
            />
          </Typography>
        </Zoom>

        {inspirations.map((inspiration, index) => (
          <Fade 
            key={index} 
            in={true} 
            timeout={1200} 
            style={{ transitionDelay: `${inspiration.delay + 800}ms` }}
          >
            <Grow
              in={true}
              timeout={1000}
              style={{ transitionDelay: `${inspiration.delay + 1200}ms` }}
            >
              <Card className={classes.inspirationCard}>
                <Box className={classes.inspirationHeader}>
                  {inspiration.icon && React.cloneElement(inspiration.icon, {
                    className: classes.inspirationIcon
                  })}
                  <Typography className={classes.inspirationTitle} dir="rtl">
                    {inspiration.title}
                  </Typography>
                </Box>
                
                <CardContent className={classes.inspirationContent}>
                  <Typography className={classes.inspirationText} dir="rtl">
                    {inspiration.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Fade>
        ))}

        {/* توقيع الكاتبة */}
        <Fade in={true} timeout={1500} style={{ transitionDelay: '2000ms' }}>
          <Box className={classes.authorCard}>
            <Typography className={classes.authorText} dir="rtl">
              شيماء...
            </Typography>
          </Box>
        </Fade>
      </Container>
    </div>
  );
};

export default ExitApp;