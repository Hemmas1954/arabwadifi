import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useData } from "./DataContext";
import {
  makeStyles,
  IconButton,
  Button,
  Typography,
  TextField,
  Grid
} from '@material-ui/core';
import mainPageBackground from './images.jpeg';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 50%, rgba(212, 165, 116, 0.8) 100%), url(${mainPageBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    zIndex: 2,
    minHeight: '100vh',
  },
  snackbar: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    left: 'auto',
    width: 'auto',
    maxWidth: 400,
    zIndex: theme.zIndex.modal + 1,
  },
  successAlert: {
    '&.MuiAlert-root': {
      backgroundColor: '#4CAF50 !important', // أخضر للتحليل الصحيح
      color: '#FFFFFF !important',
      fontWeight: '600 !important',
      fontSize: '1.1rem !important',
      fontFamily: '"Tajawal", "Cairo", sans-serif !important',
      borderRadius: '12px !important',
      boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3) !important',
      border: 'none !important',
    },
    '& .MuiAlert-message': {
      color: '#FFFFFF !important',
      fontWeight: '600 !important',
      fontSize: '1.1rem !important',
      fontFamily: '"Tajawal", "Cairo", sans-serif !important',
    },
    '& .MuiAlert-icon': {
      color: '#FFFFFF !important',
    },
    '& .MuiAlert-action': {
      color: '#FFFFFF !important',
    },
  },
  errorAlert: {
    '&.MuiAlert-root': {
      backgroundColor: '#F44336 !important', // أحمر للتحليل الخاطئ
      color: '#FFFFFF !important',
      fontWeight: '600 !important',
      fontSize: '1.1rem !important',
      fontFamily: '"Tajawal", "Cairo", sans-serif !important',
      borderRadius: '12px !important',
      boxShadow: '0 4px 16px rgba(244, 67, 54, 0.3) !important',
      border: 'none !important',
    },
    '& .MuiAlert-message': {
      color: '#FFFFFF !important',
      fontWeight: '600 !important',
      fontSize: '1.1rem !important',
      fontFamily: '"Tajawal", "Cairo", sans-serif !important',
    },
    '& .MuiAlert-icon': {
      color: '#FFFFFF !important',
    },
    '& .MuiAlert-action': {
      color: '#FFFFFF !important',
    },
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #28A745 0%, #34CE57 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(2, 4),
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 16px rgba(40, 167, 69, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    margin: theme.spacing(1),
    minWidth: 180,
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 6px 20px rgba(40, 167, 69, 0.5)',
      background: 'linear-gradient(135deg, #34CE57 0%, #28A745 100%)',
    },
  },
  secondaryButton: {
    background: 'linear-gradient(135deg, #D4A574 0%, #B8935F 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(1.5, 3),
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 16px rgba(212, 165, 116, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    margin: theme.spacing(1),
    minWidth: 160,
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 6px 20px rgba(212, 165, 116, 0.5)',
      background: 'linear-gradient(135deg, #B8935F 0%, #D4A574 100%)',
    },
  },
  textColor: {
    color: '#FFFFFF',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontWeight: 800,
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    fontSize: '2.5rem',
    marginBottom: theme.spacing(4),
    fontFamily: '"Tajawal", "Cairo", serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      marginBottom: theme.spacing(3),
    },
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1.5rem',
    marginBottom: theme.spacing(3),
    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
      marginBottom: theme.spacing(2),
    },
  },
  inputContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  inputLine: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  inputField: {
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 12,
      border: '2px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'white',
        borderColor: '#1B4E65',
      },
      '&.Mui-focused': {
        backgroundColor: 'white',
        borderColor: '#1B4E65',
        boxShadow: '0 0 0 3px rgba(27, 78, 101, 0.1)',
      },
    },
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: '"Tajawal", "Cairo", sans-serif',
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  customSpinner: {
    color: '#28A745',
    fontSize: '3rem',
  },
  // CSS للمفرقعات
  confetti: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
  },
  confettiPiece: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    backgroundColor: '#FFD700',
    animation: '$confettiFall 3s linear forwards',
  },
  '@keyframes confettiFall': {
    '0%': {
      transform: 'translateY(-100vh) rotate(0deg)',
      opacity: 1,
    },
    '100%': {
      transform: 'translateY(100vh) rotate(720deg)',
      opacity: 0,
    },
  },
  // CSS لبطاقة التهنئة
  successCard: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
    borderRadius: '20px',
    padding: theme.spacing(4),
    boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3)',
    zIndex: 10000,
    textAlign: 'center',
    minWidth: '300px',
    animation: '$successCardAppear 0.5s ease-out',
    border: '3px solid #FFD700',
  },
  '@keyframes successCardAppear': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(0.5)',
      opacity: 0,
    },
    '100%': {
      transform: 'translate(-50%, -50%) scale(1)',
      opacity: 1,
    },
  },
  successCardTitle: {
    color: '#FFFFFF',
    fontSize: '2rem',
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  successCardMessage: {
    color: '#FFFFFF',
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
  },
  successCardIcon: {
    fontSize: '4rem',
    color: '#FFD700',
    marginBottom: theme.spacing(2),
    animation: '$bounce 1s infinite',
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-10px)',
    },
    '60%': {
      transform: 'translateY(-5px)',
    },
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
    animation: '$fadeIn 0.3s ease-out',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
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
    animation: '$float 10s ease-in-out infinite',
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
      top: '70%',
      right: '10%',
      animationDelay: '3s',
    },
    '&:nth-child(3)': {
      width: 60,
      height: 60,
      bottom: '20%',
      left: '10%',
      animationDelay: '6s',
    },
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(-40px) rotate(180deg)',
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Think = () => {
  const classes = useStyles();

  const [words, setWords] = useState(["", "", "", "", "", ""]);
  const [irabs, setIrabs] = useState(["", "", "", "", "", ""]);
  const [selectedOption, setSelectedOption] = useState('');
  const { words1, selectedTense } = useData();
  const [open, setOpen] = React.useState(false);
  const [circular, setCircular] = React.useState(false);
  const [msg, setMsg] = useState('');
  const history = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isMobile, setIsMobile] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    setIsMobile(isSmallScreen);
  }, [isSmallScreen]);

  // دالة لإنشاء المفرقعات
  const createConfetti = () => {
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)]
      });
    }
    setConfettiPieces(pieces);
  };

  // دالة لإظهار التأثيرات عند الإجابة الصحيحة
  const showSuccessEffects = () => {
    createConfetti();
    setShowConfetti(true);
    setShowSuccessCard(true);
    
    // إخفاء المفرقعات بعد 4 ثوان
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    
    // إخفاء بطاقة التهنئة بعد 5 ثوان
    setTimeout(() => {
      setShowSuccessCard(false);
    }, 5000);
  };

  const handleGoRules = (page) => {
    history(`/Rules`);
  }

  const handleTrayAgain = () => {
    let testing = []
    for (let i = 0; i < words.length; i++) {
      testing.push("")
    }
    setIrabs(testing)
  }

  const handleBack = (page) => {
    history(`/${page}`);
  };

  const handleInputChange = (index, value, length) => {
    console.log(length);
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
  };

  const handleInputIrabChange = (index, value) => {
    const updatedIrabs = [...irabs];
    updatedIrabs[index] = value;
    setIrabs(updatedIrabs);
  };

  const handleClickSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setWords(words1);
    setSelectedOption(selectedTense);
    let testing = []
    for (let i = 0; i < words1.length; i++) {
      testing.push("")
    }
    setIrabs(testing)
    if (words1.length === 0) {
      setWords(["", "", "", "", "", ""])
      setIrabs(["", "", "", "", "", ""])
    }
  }, [words1, selectedTense]);

  const handleClick = async () => {
    try {
      setCircular(true)
      console.log(selectedOption);
      const response = await axios.post(`https://islamirabback3.vercel.app/compareGrammer`, {
        words: words,
        irabs: irabs,
        table: selectedOption
      });
      if (response.status === 200) {
        setCircular(false)
        handleClickSnackbar();
        const data = response.data;
        console.log(data);
        if (data === true) {
          setMsg('ok');
          showSuccessEffects(); // تشغيل المفرقعات وبطاقة التهنئة
        } else if (data === 'this tense does not exist in database') {
          setMsg('word_Flase');
        } else {
          setMsg('not_ok');
        }
      } else {
        setCircular(false)
        handleClickSnackbar();
        setMsg('uknown_problem')
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      handleClickSnackbar();
      setMsg('no_conection_with_server')
      console.error('Error fetching data:', error);
    }
  }

  function tenseShowed(params) {
    if (msg === 'ok')
      return 'تحليلك صحيح'
    else if (msg === 'word_Flase')
      return 'الرجاء إختيار جملة من قائمة الجمل'
    else if (msg === 'uknown_problem')
      return 'مشكل غير معروف, الرجاء أعد المحاولة'
    else if (msg === 'no_conection_with_server')
      return 'انقطع الإتصال بالخادم'
    else
      return 'يوجد خطأ عل مستوى التحليل'
  }

  function checkAnalze(params) {
    if (msg === 'ok')
      return 'success'
    else
      return 'error'
  }

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

      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar} 
        className={classes.snackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={checkAnalze()}
          className={checkAnalze() === 'success' ? classes.successAlert : classes.errorAlert}
          style={{
            backgroundColor: checkAnalze() === 'success' ? '#4CAF50' : '#F44336',
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '1.1rem',
            fontFamily: '"Tajawal", "Cairo", sans-serif',
            borderRadius: '12px',
            boxShadow: checkAnalze() === 'success' 
              ? '0 4px 16px rgba(76, 175, 80, 0.3)' 
              : '0 4px 16px rgba(244, 67, 54, 0.3)'
          }}
        >
          {tenseShowed()}
        </Alert>
      </Snackbar>

      <Grid container className={classes.container} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.pageTitle} align="center" dir="rtl">
            فكر وحلل
          </Typography>
        </Grid>

        <Grid item xs={12} md={10} lg={8}>
          <div className={classes.inputContainer}>
            <Typography variant="h4" className={classes.sectionTitle} align="center" dir="rtl">
              جملة التحليل
            </Typography>
            <div className={classes.inputLine}>
              {words.map((word, index) => (
                <TextField
                  key={index}
                  id={`word-${index}`}
                  variant="outlined"
                  className={classes.inputField}
                  value={word}
                  placeholder={`كلمة ${index + 1}`}
                  style={{ 
                    width: `${Math.max(120, (word.length * 12) + 40)}px`,
                    margin: '8px'
                  }}
                  onChange={(e) => handleInputChange(index, e.target.value, word.length)}
                />
              ))}
            </div>
          </div>

          <div className={classes.inputContainer}>
            <Typography variant="h4" className={classes.sectionTitle} align="center" dir="rtl">
              أدخل التحليل الوظيفي
            </Typography>
            <div className={classes.inputLine}>
              {irabs.map((irab, index) => (
                <TextField
                  key={index}
                  id={`irab-${index}`}
                  variant="outlined"
                  className={classes.inputField}
                  value={irab}
                  placeholder={`تحليل ${index + 1}`}
                  style={{ 
                    width: `${Math.max(120, (irab && irab.length ? irab.length * 12 : 0) + 40)}px`,
                    margin: '8px'
                  }}
                  autoComplete="off"
                  onChange={(e) => handleInputIrabChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>

          <Grid container justifyContent="center" spacing={2} style={{ marginTop: '32px' }}>
            <Grid item>
              <Button 
                variant="contained" 
                onClick={handleClick} 
                className={classes.primaryButton}
                disabled={circular}
              >
                {circular ? 'جاري التحليل...' : 'تصحيح التحليل'}
              </Button>
            </Grid>

            {msg === 'not_ok' && (
              <>
                <Grid item>
                  <Button 
                    variant="contained" 
                    onClick={handleTrayAgain} 
                    className={classes.secondaryButton}
                  >
                    أعد المحاولة
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    onClick={handleGoRules} 
                    className={classes.secondaryButton}
                  >
                    راجع القواعد
                  </Button>
                </Grid>
              </>
            )}
          </Grid>

          {circular && (
            <div className={classes.loadingContainer}>
              <CircularProgress className={classes.customSpinner} size={60} />
            </div>
          )}
        </Grid>
      </Grid>

      {/* المفرقعات */}
      {showConfetti && (
        <div className={classes.confettiContainer}>
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className={classes.confettiPiece}
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.animationDelay}s`,
                backgroundColor: piece.backgroundColor
              }}
            />
          ))}
        </div>
      )}

      {/* بطاقة التهنئة */}
      {showSuccessCard && (
        <>
          <div className={classes.successOverlay} />
          <div className={classes.successCard}>
            <CheckCircleIcon style={{ 
              fontSize: '5rem', 
              color: '#FFFFFF', 
              marginBottom: '20px',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
            }} />
            <Typography variant="h2" style={{ 
              color: '#FFFFFF', 
              fontWeight: '900', 
              marginBottom: '20px',
              fontFamily: '"Tajawal", "Cairo", sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: '2.5rem',
              lineHeight: '1.2'
            }}>
              أحسنت! تحليلك صحيح
            </Typography>
            <Typography variant="h4" style={{ 
              color: '#FFFFFF', 
              marginBottom: '30px',
              fontFamily: '"Tajawal", "Cairo", sans-serif',
              textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
              fontSize: '1.8rem',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>
              لقد قمت بتحليل الجملة بشكل صحيح
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <StarIcon style={{ 
                fontSize: '3rem', 
                color: '#FFD700',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))'
              }} />
              <StarIcon style={{ 
                fontSize: '3rem', 
                color: '#FFD700',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))'
              }} />
              <StarIcon style={{ 
                fontSize: '3rem', 
                color: '#FFD700',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))'
              }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Think;
