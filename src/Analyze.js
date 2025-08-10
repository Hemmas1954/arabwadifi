import React, { useState, useEffect } from 'react';
import { useData } from './DataContext';
import { Link } from 'react-router-dom';
import mainPageBackground from './images2.PNG';
import { 
  makeStyles, 
  IconButton, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box, 
  Fade,
  Chip 
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 50%, rgba(212, 165, 116, 0.8) 100%), url(${mainPageBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(3, 0),
    overflow: 'hidden',
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", serif !important',
    fontDisplay: 'swap',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    '& *': {
      fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", serif !important',
      fontDisplay: 'swap !important',
    },
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
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", serif !important',
    fontDisplay: 'swap !important',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textAlign: 'center',
    direction: 'rtl',
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
  accordion: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: 16,
    marginBottom: theme.spacing(3),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
    direction: 'rtl',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: `${theme.spacing(3)}px 0`,
    },
    '& *': {
      fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
      fontDisplay: 'swap !important',
    },
  },
  accordionSummary: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    borderRadius: '16px 16px 0 0',
    minHeight: 70,
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
    direction: 'rtl',
    '&.Mui-expanded': {
      minHeight: 70,
      borderRadius: '16px 16px 0 0',
    },
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
      '&.Mui-expanded': {
        margin: '12px 0',
      },
    },
    '& *': {
      fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
      fontDisplay: 'swap !important',
    },
  },
  accordionTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
    fontDisplay: 'swap !important',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    direction: 'rtl',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  accordionDetails: {
    padding: theme.spacing(3),
    background: 'rgba(255, 255, 255, 0.98)',
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
    direction: 'rtl',
    '& *': {
      fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
      fontDisplay: 'swap !important',
    },
  },
  sentenceCard: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(27, 78, 101, 0.1)',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      background: 'rgba(255, 255, 255, 1)',
      borderColor: '#1B4E65',
    },
    '&:active': {
      transform: 'translateY(0) scale(1.01)',
    },
  },
  sentenceLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    width: '100%',
  },
  sentenceText: {
    fontSize: '1.4rem',
    color: '#2c3e50',
    fontWeight: 600,
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
    fontDisplay: 'swap !important',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    lineHeight: 1.8,
    textAlign: 'right',
    direction: 'rtl',
    padding: theme.spacing(2),
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      background: 'rgba(255, 255, 255, 1)',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      padding: theme.spacing(1.5),
    },
  },
  playIcon: {
    marginLeft: theme.spacing(2),
    color: '#28A745',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
  },
  questionCard: {
    background: 'linear-gradient(135deg, #D4A574 0%, #B8935F 100%)',
    borderRadius: 12,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 3),
    boxShadow: '0 4px 16px rgba(212, 165, 116, 0.3)',
  },
  questionText: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 600,
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
    fontDisplay: 'swap !important',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    direction: 'rtl',
  },
  questionIcon: {
    marginLeft: theme.spacing(2),
    fontSize: '1.5rem',
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
    fontDisplay: 'swap !important',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    marginLeft: theme.spacing(2),
    minWidth: '50px',
    height: '40px',
    borderRadius: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    direction: 'rtl',
    '& .MuiChip-label': {
      padding: theme.spacing(0, 2),
      fontFamily: '"Tajawal", "Tajawal-fallback", "Cairo", "Tahoma", "Arial", sans-serif !important',
      fontDisplay: 'swap !important',
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
    animation: '$float 12s ease-in-out infinite',
    '&:nth-child(1)': {
      width: 100,
      height: 100,
      top: '10%',
      left: '5%',
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      width: 150,
      height: 150,
      top: '60%',
      right: '8%',
      animationDelay: '4s',
    },
    '&:nth-child(3)': {
      width: 80,
      height: 80,
      bottom: '20%',
      left: '10%',
      animationDelay: '8s',
    },
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
    },
  },
}));

const Analyze = () => {
  const { selectedTense, setSelectedTense, words1, setWords1 } = useData();
  const classes = useStyles();
  const history = useNavigate();
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // التأكد من تحميل الخطوط
  useEffect(() => {
    const checkFonts = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
          // التحقق من الخطوط العربية المحددة
          const arabicFonts = ['Tajawal', 'Cairo', 'Noto Sans Arabic'];
          const fontChecks = arabicFonts.map(font => 
            document.fonts.check(`16px "${font}"`)
          );
          
          if (fontChecks.some(check => check)) {
            setFontsLoaded(true);
          } else {
            // استخدام خطوط احتياطية
            setTimeout(() => setFontsLoaded(true), 100);
          }
        } else {
          // للمتصفحات القديمة
          setTimeout(() => setFontsLoaded(true), 200);
        }
      } catch (error) {
        console.warn('Font loading check failed:', error);
        setFontsLoaded(true);
      }
    };

    checkFonts();
  }, []);

  const handleBack = (page) => {
    history(`/${page}`);
  };

  const handleTenseClick = (tense, tableId) => {
    setSelectedTense(tableId);
    setWords1(tense.split('  '));
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  // تنظيم البيانات في هيكل منظم
  const grammaticalSections = [
    {
      id: 'section1',
      title: 'الإطار الحملي الموسّع',
      number: '١',
      tableId: '1',
      sentences: [
        'شرب  الطّفل  الماء  البارحة  في الغرفة',
        'فجّر  الأشاوس  الثورة  ليلًا  في جبال الأوراس',
        'ودّع  أطفال غزّة  شهداء عائلاتهم  بعد القصف  في المستشفى',
        'أكرم  سامي  ضيفه  البارحة  في منزله',
        'خرج  المجاهدون  /  ليلاً  إلى مناطق العدوّ'
      ]
    },
    {
      id: 'section2', 
      title: 'محلّاتية المحمولات',
      number: '٢',
      tableId: '2',
      sentences: [
        'دخل  العرب في سُبات',
        'فاز  المتّقون',
        'انتصر  الحقّ',
        'استشهد  الرّضّع في غزّة',
        'انهزم  الظّالمون',
        'كتب  أنس  الدّرس',
        'دعا  العبد  ربّه',
        'أخلصت  المعلّمة  عملها',
        'خذل  حكّام العرب  القضيّة الفلسطينيّة',
        'عاتب  صراخ أطفال غزّة  الضّمائر العربيّة',
        'علّمت  الأمّ  ابنتَها  الحياءَ',
        'أعلم  الأستاذ  التّلاميذ  القراءة نافعةً',
        'حدّث  الرسول (صلى الله عليه وسلّم)  الصحابة  الصّدقَ منجاة',
        'أنبأت  كتائب القسّام  التراجعَ  مستحيلًا',
        'وما عليك إذا أخبَرْ  تِ  نِي  دنفاً وغاب بعلك يوما أن تعوديني'
      ]
    },
    {
      id: 'section3',
      title: 'قواعد إدماج الحدود في محلّاتها وفقًا لقيود الانتقاء',
      number: '٣', 
      tableId: '3',
      sentences: [
        'شرب  أنس  حليبا',
        'أعزّ  الثّوّار  الإسلام',
        'نام  أهل الحقّ  عن الحقّ',
        'أرشد  الأنبياءُ  النّاسَ',
        'أكرمَ  الإسلامُ  المرأةَ'
      ]
    },
    {
      id: 'section4',
      title: 'الوظائف التّداوليّة بالنّظر إلى وضعها بالنّسبة للحمل',
      number: '٤',
      tableId: '4',
      sentences: [
        'زارتني عائشة  ،  بل نعيمة',
        'انتفض العربُ  ،  بل طوفان الأقصى',
        'ما جاء القوم  ،  لكن زيدٌ',
        'جاء إسلام  ،  لا محمد',
        'اذهب إلى بغدادَ  ،  أو دعْ ذلك',
        'طالب العلم  ،  تحفّه الصّعاب في مساره',
        'مجلس علمٍ يُنتفَع به  ،  خيرٌ من عبادةِ سبعين سنةً',
        'حياء الفتاة  ،  يعلي قدرها ويحفظ كرامتها',
        'المتمسّك بدينه  ،  غريب عنه في يومنا',
        'يا كافل اليتيم  ،  أبشر',
        'يا أهل غزّة  ،  لكم الله',
        'يا مسلم  ،  اتّق الله',
        'يا نفسُ  ،  لا تقنطي من رحمة الله',
        'أي بنيّ  ،  اتّقِ زلّة اللّسان'
      ],
      questions: [
        {
          question: 'من قابلت هندٌ؟',
          answer: 'قابلت  هند  سعادا'
        },
        {
          question: 'من نادى الشّعب الفلسطيني؟',
          answer: 'نادى  الشّعب الفلسطيني  العربَ الأحرار'
        },
        {
          question: 'أين نزل الوحي على الرسول صلّى الله عليه وسلّم؟',
          answer: 'نزل  الوحي على الرّسول صلى الله عليه وسلّم  في غار حراء'
        },
        {
          question: 'ما جزاء من أحسن للنّاس؟',
          answer: 'جزاء من أحسن للنّاس  الجنّة'
        },
        {
          question: 'كم شخصًا قتل ناقة النّبيّ صالح؟',
          answer: 'قتل  ناقةَ النّبيّ صالح  تسعةُ أشخاصٍ'
        }
      ]
    },
    {
      id: 'section5',
      title: 'إسناد الوظيفتين المحور وبؤرة الجديد إلى الحدّين الفاعل والمفعول',
      number: '٥',
      tableId: '5',
      sentences: [
        'شرب  أنس  الحليب',
        'أعزّ  الثّوّار  الإسلام',
        'نام  أهل  الحقّ عن الحقّ',
        'أرشد  الأنبياءُ  النّاسَ',
        'أكرمَ  الإسلامُ  المرأةَ'
      ]
    },
    {
      id: 'section6',
      title: 'القوّة الإنجازيّة الحرفيّة يؤشّر لها بمخصّص حمل "بسيط"',
      number: '٦',
      tableId: '6',
      sentences: [
        'شرب  أنس  الحليب',
        'أعزّ  الثّوّار  الإسلام',
        'نام  أهل الحقّ  عن الحقّ',
        'أرشد  الأنبياءُ  النّاسَ',
        'أكرمَ  الإسلامُ  المرأةَ'
      ]
    },
    {
      id: 'section7',
      title: 'القوّتان الإنجازيّتان الحرفيّة والمستلزمة يؤشّر لهما بمخصّص حمل "مركّب"',
      number: '٧',
      tableId: '7', 
      sentences: [
        'أَوَ  قابل  محمّدٌ  فاطمةً؟',
        'أَوَ  فهمت  زينب  الدّرسَ؟',
        'أَوَ  قتل  جنود الاحتلال  الأطفال؟',
        'أَوَ  وجد  عابر السّبيل  ضالّته؟',
        'أَوَ  خاب  من دعا  اللهَ؟'
      ]
    },
    {
      id: 'section8',
      title: 'قواعد نقل البنية الوظيفيّة إلى بنية مكوّنيّة وإسناد الحالتين الإعرابيّتين',
      number: '٨',
      tableId: '8',
      sentences: [
        'شرب  أنس  حليباً',
        'أعزّ  الثّوّار  الإسلام',
        'نام  أهل الحقّ  عن الحقّ',
        'أرشد  الأنبياءُ  النّاسَ',
        'أكرمَ  الإسلامُ  المرأةَ'
      ]
    },
    {
      id: 'section9',
      title: 'البنية العامّة للحمل؛ إذ تتحدّد الحدود بالنّظر إلى أهميّتها بالنّسبة للواقعة',
      number: '٩',
      tableId: '9',
      sentences: [
        'أهدى  أنسٌ  شيماءً  وردةً  البارحة  في المنزل',
        'علم  المسلمُ  اللهَ  منّانًا  كلّ حينٍ  في كلّ مكان',
        'تعلّم  الابن  قول الأذكار  مفيدًا  صباحَ  مساءَ',
        'ألفى  العبدُ  ربَّه  شريكَه  في الغنى  وفي العُدمِ',
        'حجا  أهل فلسطين  كلَّ عربيٍّ  أخا ثقةٍ  حتَّى  ألمّت بهم المُلِمّات'
      ]
    },
    {
      id: 'section10',
      title: 'صورنة الحمل في شكل إطار حملي يمثّل للمعلومات',
      number: '١٠',
      tableId: '10',
      sentences: [
        'أهدى  أنس  شيماء  وردة  البارحة  في المنزل',
        'أعطى  المعلّم  التّلاميذَ  درسًا  يوم الأحد  في المدرّج',
        'أعلم  الصحفيّ  البشريّة  هجوم المحتلّ  أمس  على المستشفى',
        'صيّرت  النّار  غابات الجزائر  رمادا  الصّيف الماضي',
        'ردّ  الإسلام  الحزين  سعيدا  بكرة  وعشيّا'
      ]
    }
  ];

  return (
    <div className={classes.root} style={{ 
      opacity: fontsLoaded ? 1 : 0.7,
      transition: 'opacity 0.3s ease-in-out'
    }}>
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
            جمل التحليل الوظيفي
          </Typography>
        </Fade>

        {grammaticalSections.map((section, index) => (
          <Fade 
            key={section.id} 
            in={true} 
            timeout={1000} 
            style={{ transitionDelay: `${index * 200 + 400}ms` }}
          >
            <Accordion 
              className={classes.accordion}
              expanded={expandedPanel === section.id}
              onChange={handleAccordionChange(section.id)}
            >
              <AccordionSummary 
                className={classes.accordionSummary}
                expandIcon={<ExpandMoreIcon style={{ color: 'white', fontSize: '2rem' }} />}
                aria-controls={`${section.id}-content`}
                id={`${section.id}-header`}
              >
                <Chip 
                  label={section.number} 
                  className={classes.categoryChip}
                />
                <Typography className={classes.accordionTitle} dir="rtl">
                  {section.title}
                </Typography>
              </AccordionSummary>
              
              <AccordionDetails className={classes.accordionDetails}>
                <Box width="100%">
                  {/* عرض الجمل العادية */}
                  {section.sentences.map((sentence, sentenceIndex) => (
                    <Box key={sentenceIndex} className={classes.sentenceCard}>
                      <Link 
                        to="/Think" 
                        onClick={() => handleTenseClick(sentence, section.tableId)}
                        className={classes.sentenceLink}
                      >
                        <Box className={classes.sentenceText} dir="rtl">
                          {sentence.replace(/  /g, ' ')}
                          <PlayArrowIcon className={classes.playIcon} />
                        </Box>
                      </Link>
                    </Box>
                  ))}

                  {/* عرض الأسئلة إن وجدت */}
                  {section.questions && section.questions.map((qa, qaIndex) => (
                    <Box key={`question-${qaIndex}`} style={{ marginTop: '24px' }}>
                      <Box className={classes.questionCard}>
                        <Typography className={classes.questionText} dir="rtl">
                          <QuestionAnswerIcon className={classes.questionIcon} />
                          {qa.question}
                        </Typography>
                      </Box>
                      <Box className={classes.sentenceCard}>
                        <Link 
                          to="/Think" 
                          onClick={() => handleTenseClick(qa.answer, section.tableId)}
                          className={classes.sentenceLink}
                        >
                          <Box className={classes.sentenceText} dir="rtl">
                            {qa.answer.replace(/  /g, ' ')}
                            <PlayArrowIcon className={classes.playIcon} />
                          </Box>
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Fade>
        ))}
      </Container>
    </div>
  );
};

export default Analyze;