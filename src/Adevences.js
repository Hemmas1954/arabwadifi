import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  makeStyles, 
  Container, 
  Typography, 
  IconButton, 
  Box, 
  Card, 
  CardContent, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Divider
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Advence from "./Advences.PNG";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InfoIcon from '@material-ui/icons/Info';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AssignmentIcon from '@material-ui/icons/Assignment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 50%, rgba(212, 165, 116, 0.8) 100%), url(${Advence})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(3, 0),
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontWeight: 800,
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    fontSize: '3rem',
    marginBottom: theme.spacing(6),
    fontFamily: '"Tajawal", "Cairo", serif',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      marginBottom: theme.spacing(3),
    },
  },
  backButton: {
    position: 'fixed',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: theme.zIndex.appBar + 2,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#FFF',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.1)',
    },
  },
  sectionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: 16,
    marginBottom: theme.spacing(4),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    },
  },
  sectionHeader: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  warningHeader: {
    background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
  },
  sectionIcon: {
    marginLeft: theme.spacing(2),
    fontSize: '2.5rem',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    flex: 1,
  },
  sectionContent: {
    padding: theme.spacing(4),
  },
  stepCard: {
    background: 'rgba(40, 167, 69, 0.1)',
    borderRadius: 12,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    border: '1px solid rgba(40, 167, 69, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(40, 167, 69, 0.15)',
      transform: 'translateX(8px)',
    },
  },
  stepTitle: {
    color: '#1B4E65',
    fontSize: '1.3rem',
    fontWeight: 700,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  stepIcon: {
    marginLeft: theme.spacing(2),
    color: '#28A745',
    fontSize: '1.5rem',
  },
  stepText: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#2C5F41',
    lineHeight: 1.8,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
  },
  warningAlert: {
    borderRadius: 12,
    marginBottom: theme.spacing(2),
    '& .MuiAlert-icon': {
      fontSize: '1.5rem',
    },
    '& .MuiAlert-message': {
      fontFamily: '"Tajawal", "Cairo", sans-serif',
      fontSize: '1.1rem',
      fontWeight: 500,
    },
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
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%',
    animation: '$float 15s ease-in-out infinite',
    '&:nth-child(1)': {
      width: 100,
      height: 100,
      top: '15%',
      left: '8%',
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      width: 150,
      height: 150,
      top: '70%',
      right: '12%',
      animationDelay: '5s',
    },
    '&:nth-child(3)': {
      width: 80,
      height: 80,
      bottom: '30%',
      left: '15%',
      animationDelay: '10s',
    },
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(-20px) rotate(180deg)',
    },
  },
  feedbackBox: {
    background: 'rgba(40, 167, 69, 0.1)',
    border: '1px solid rgba(40, 167, 69, 0.3)',
    borderRadius: 8,
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
  },
  errorFeedbackBox: {
    background: 'rgba(220, 53, 69, 0.1)',
    border: '1px solid rgba(220, 53, 69, 0.3)',
  },
}));

const Adevences = () => {
  const classes = useStyles();
  const history = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleBack = (page) => {
    history(`/${page}`);
  };

  const usageSteps = [
    {
      title: 'الخطوة الأولى',
      icon: <PlayCircleFilledIcon />,
      content: 'اضغط على أيقونة «ابدأ» الموجودة في واجهة البرنامج للوصول إلى الخيارات الرئيسية.'
    },
    {
      title: 'جمل التحليل الوظيفي',
      icon: <AssignmentIcon />,
      content: 'قسم يحتوي على مجموعة من الكلمات المفتاحية للقواعد التي يمكن تطبيقها على مجموعة من الجمل المعروضة.'
    },
    {
      title: 'فكّر وحلّل',
      icon: <QuestionAnswerIcon />,
      content: 'اختر الجملة التي تريد تحليلها وظيفياً سواءً بالضغط عليها في قائمة الجمل أم بكتابتها، ثم قم بالتحليل.'
    },
    {
      title: 'قواعد النحو الوظيفي',
      icon: <MenuBookIcon />,
      content: 'صفحة تحتوي على مجموعة القواعد التي يمكن مراجعتها والتي يسمح البرنامج بالتحليل وفقها.'
    }
  ];

  const warnings = [
    'تجنّب ترك الفراغات أثناء التحليل',
    'إذا كانت الكلمة لا تستوجب أي إجابة، ضع علامة /',
    'راجع القواعد عند ظهور رسالة خطأ',
    'استخدم زر «أعد المحاولة» للتصحيح'
  ];

  return (
    <div className={classes.root}>
      {/* العناصر المتحركة في الخلفية */}
      <div className={classes.floatingElements}>
        <div className={classes.floatingShape}></div>
        <div className={classes.floatingShape}></div>
        <div className={classes.floatingShape}></div>
      </div>

      <IconButton 
        onClick={() => handleBack('MainPage')} 
        className={classes.backButton} 
        aria-label="back"
      >
        <ArrowBackIcon style={{ fontSize: '2.5rem' }} />
      </IconButton>

      <Container maxWidth="lg" className={classes.container}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h1" className={classes.pageTitle} dir="rtl">
            إرشادات الاستعمال
          </Typography>
        </Fade>

        {/* قسم إرشادات الاستعمال */}
        <Fade in={true} timeout={1200}>
          <Card className={classes.sectionCard}>
            <Box className={classes.sectionHeader}>
              <InfoIcon className={classes.sectionIcon} />
              <Typography className={classes.sectionTitle} dir="rtl">
                كيفية استخدام البرنامج
              </Typography>
            </Box>
            
            <CardContent className={classes.sectionContent}>
              {usageSteps.map((step, index) => (
                <Fade 
                  key={index} 
                  in={true} 
                  timeout={800} 
                  style={{ transitionDelay: `${index * 200 + 400}ms` }}
                >
                  <Box className={classes.stepCard}>
                    <Typography className={classes.stepTitle} dir="rtl">
                      {step.icon}
                      {step.title}
                    </Typography>
                    <Typography className={classes.stepText} dir="rtl">
                      {step.content}
                    </Typography>
                  </Box>
                </Fade>
              ))}

              {/* توضيح آلية التغذية الراجعة */}
              <Box style={{ marginTop: '32px' }}>
                <Typography 
                  variant="h6" 
                  dir="rtl" 
                  style={{ 
                    marginBottom: '16px', 
                    fontFamily: '"Tajawal", "Cairo", sans-serif',
                    fontWeight: 700,
                    color: '#1B4E65'
                  }}
                >
                  آلية التغذية الراجعة:
                </Typography>
                
                <Box className={classes.feedbackBox} dir="rtl">
                  <CheckCircleIcon style={{ color: '#28A745', marginLeft: '12px' }} />
                  <Typography>
                    <strong>الإجابة الصحيحة:</strong> يظهر شريط أخضر مع رسالة «تحليلك صحيح»
                  </Typography>
                </Box>

                <Box className={`${classes.feedbackBox} ${classes.errorFeedbackBox}`} dir="rtl">
                  <ErrorIcon style={{ color: '#dc3545', marginLeft: '12px' }} />
                  <Typography>
                    <strong>الإجابة الخاطئة:</strong> يظهر شريط أحمر مع رسالة «تحليلك خاطئ راجع القواعد»
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* قسم التحذيرات */}
        <Fade in={true} timeout={1400}>
          <Card className={classes.sectionCard}>
            <Box className={`${classes.sectionHeader} ${classes.warningHeader}`}>
              <WarningIcon className={classes.sectionIcon} />
              <Typography className={classes.sectionTitle} dir="rtl">
                تحذيرات مهمة للاستعمال
              </Typography>
            </Box>
            
            <CardContent className={classes.sectionContent}>
              {warnings.map((warning, index) => (
                <Alert 
                  key={index}
                  severity="warning" 
                  className={classes.warningAlert}
                  style={{ marginBottom: '16px' }}
                >
                  <Typography dir="rtl">{warning}</Typography>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </div>
  );
};

export default Adevences;