import React, { useState } from 'react';
import RulesBackground from "./RulesBackground3.jpg";
import { useNavigate } from 'react-router-dom';
import { 
  makeStyles, 
  Container, 
  Typography, 
  IconButton, 
  Box, 
  Card, 
  CardContent, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Chip,
  Button,
  Grid,
  Divider
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GetAppIcon from '@material-ui/icons/GetApp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 50%, rgba(212, 165, 116, 0.8) 100%), url(${RulesBackground})`,
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
  ruleCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: 16,
    marginBottom: theme.spacing(3),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    },
  },
  ruleHeader: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  ruleIcon: {
    marginLeft: theme.spacing(2),
    fontSize: '2rem',
  },
  ruleTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    flex: 1,
  },
  ruleContent: {
    padding: theme.spacing(3, 4),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    lineHeight: 2,
    direction: 'rtl',
    '& .MuiTypography-root': {
      marginBottom: theme.spacing(2),
    },
  },
  ruleText: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#1B4E65',
    lineHeight: 1.8,
    marginBottom: theme.spacing(2.5),
  },
  formula: {
    background: 'rgba(40, 167, 69, 0.1)',
    border: '1px solid rgba(40, 167, 69, 0.3)',
    borderRadius: 8,
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    fontFamily: '"Courier New", monospace',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#28A745',
    direction: 'ltr',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.1)',
  },
  accent: {
    color: '#D4A574',
    fontWeight: 700,
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
      width: 80,
      height: 80,
      top: '15%',
      left: '8%',
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      width: 120,
      height: 120,
      top: '70%',
      right: '12%',
      animationDelay: '5s',
    },
    '&:nth-child(3)': {
      width: 60,
      height: 60,
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
  abbreviation: {
    background: 'linear-gradient(135deg, #D4A574 0%, #B8935F 100%)',
    color: 'white',
    padding: theme.spacing(2),
    borderRadius: 8,
    margin: theme.spacing(3, 0),
    textAlign: 'center',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontWeight: 600,
    fontSize: '1.1rem',
    boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)',
  },
  sourcesSection: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: 16,
    marginBottom: theme.spacing(4),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  },
  sourcesHeader: {
    background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)',
    color: 'white',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  sourcesTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    flex: 1,
  },
  sourcesContent: {
    padding: theme.spacing(3),
  },
  pdfCard: {
    background: 'rgba(40, 167, 69, 0.05)',
    border: '2px solid rgba(40, 167, 69, 0.2)',
    borderRadius: 12,
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(40, 167, 69, 0.1)',
      border: '2px solid rgba(40, 167, 69, 0.4)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(40, 167, 69, 0.2)',
    },
  },
  pdfInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  pdfName: {
    fontWeight: 600,
    color: '#28A745',
    fontSize: '1.1rem',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
  },
  pdfDescription: {
    color: '#666',
    fontSize: '0.9rem',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginTop: theme.spacing(1),
  },
  uploadButton: {
    background: 'linear-gradient(135deg, #007BFF 0%, #0056B3 100%)',
    color: 'white',
    padding: theme.spacing(1.5, 3),
    borderRadius: 8,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontWeight: 600,
    '&:hover': {
      background: 'linear-gradient(135deg, #0056B3 0%, #004085 100%)',
    },
  },
  downloadButton: {
    background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: 6,
    minWidth: 'auto',
    '&:hover': {
      background: 'linear-gradient(135deg, #20C997 0%, #17A2B8 100%)',
    },
  },
  hiddenInput: {
    display: 'none',
  },
  sourcesContainer: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    background: 'rgba(212, 165, 116, 0.1)',
    borderRadius: 8,
    border: '1px solid rgba(212, 165, 116, 0.3)',
  },
  sourcesTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#D4A574',
    marginBottom: theme.spacing(1.5),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    display: 'flex',
    alignItems: 'center',
  },
  sourceItem: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: 1.6,
    marginBottom: theme.spacing(1),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    paddingRight: theme.spacing(2),
    position: 'relative',
    '&:before': {
      content: '"•"',
      color: '#D4A574',
      fontWeight: 'bold',
      position: 'absolute',
      right: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const Rules = () => {
  const classes = useStyles();
  const history = useNavigate();
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [pdfFiles] = useState([
    {
      id: 1,
      name: 'الوظيفة والبنية - أحمد المتوكل',
      description: 'دراسة معمقة في النحو الوظيفي العربي وتطبيقاته النظرية والعملية، يتناول الكتاب الوظائف النحوية والبنى التركيبية في إطار نظرية النحو الوظيفي',
      fileName: '1.pdf',
      url: '/1.pdf',
      uploaded: true
    },
    {
      id: 2,
      name: 'اللسانيات الوظيفية: مدخل نظري',
      description: 'مقدمة شاملة في اللسانيات الوظيفية ونظرياتها المعاصرة، يعرض الأسس النظرية للنحو الوظيفي ومناهج التحليل اللغوي الوظيفي',
      fileName: '2.pdf',
      url: '/2.pdf',
      uploaded: true
    }
  ]);

  const handleBack = (page) => {
    history(`/${page}`);
  };

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };



  const handleDownload = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'document.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rulesData = [
    {
      id: 1,
      title: 'البنية الحملية',
      content: [
        'من الإطار الحملي النووي إلى الإطار الحملي الموسّع:',
        '[ف، الحدود الموضوعات (س1...سن)، الحدود اللّواحق (ص1...صن)]'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 139 حتى 144.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 13.'
      ]
    },
    {
      id: 2,
      title: 'تصنيف المحمولات على أساس الموضوعات',
      content: [
        'يشكّل الإطار الحملي دخلاً لقواعد إدماج الحدود في محلّاتها وفقاً لقيود الانتقاء المفروضة على هذه المحلّات:',
        '[ف (س1، منف) (س2، متق)]'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 145.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 13.'
      ]
    },
    {
      id: 3,
      title: 'قواعد توسيع الأطر الحملية',
      content: [
        'صورنة الحمل في شكل إطار حملي يمثّل للمعلومات: صورة المحمول المجرّدة، مقولته التّركيبيّة، عدد محلّات حدوده،',
        'قيود الانتقاء الّتي يفرضها المحمول على محلّات حدوده الموضوعات:',
        '[ف (س1، إنسان/حي، منف) (س2، إنسان/ حي، متق) (س3، لا حي، مستق) الحدود اللّواحق (ص1...صن، زم/مك)]'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 145–146.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 15.'
      ]
    },
    {
      id: 4,
      title: 'النقل إلى بنية حملية تامة التحديد',
      content: [
        'إسناد الوظيفتين المحور وبؤرة الجديد إلى الحدّين الفاعل والمفعول:',
        '[تد [تا [مض، ف (ع/ن، ذ/ث، س1، منف، فا، مح) (ع/ن، ذ/ث، س2، متق، مف، بؤ جد)]]]'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 146–147–148.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 15.'
      ]
    },
    {
      id: 5,
      title: 'الوظائف التداولية بالنظر إلى وضعية البنية الحملية',
      content: [
        'القوّة الإنجازيّة الحرفيّة يؤشّر لها بمخصّص حمل "بسيط" كما هو الشّأن في البنية الوظيفيّة تامّة التّحديد:',
        '[خب [تد [تا [مض، ف (ع/ن، ذ/ث، س1، منف، فا، مح) (ع/ن، ذ/ث، س2، متق، مف، بؤ جد)]]]]'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 151–152–153.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 17.'
      ]
    },
    {
      id: 6,
      title: 'إسناد الوظيفتين المحور وبؤرة الجديد إلى الحدين الفاعل والمفعول',
      content: [
        'قواعد نقل البنية الوظيفيّة إلى بنية مكوّنيّة وإسناد الحالتين الإعرابيّتين الرفع والنّصب إلى الحدّ الأول والحدّ الثّاني',
        'على التّوالي بمقتضى وظيفتيهما التّركيبيّتين الفاعل والمفعول:',
        '[خب [تد [تا [مض، ف (ع/ن، ذ/ث، س1، منف، فا، مح، رفع) (ع/ن، ذ/ث، س2، متق، مف، بؤ جد، نصب)]]]]'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 153–154–155–156.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 19.'
      ]
    },
    {
      id: 7,
      title: 'القوة الإنجازية الحرفية يؤشّر لها بمخصّص حمل "بسيط"',
      content: [
        'ويتحقق المحمول "شرب" في شكل فعل ماض بواسطة قاعدة الصّياغة:',
        '[تد [تا [مض α ف (س1) ... (س ن)]]]',
        '[ماض – α ف (س 1) ... (س ن)]',
        'بهذا تنقل البنية السابقة إلى البنية:',
        '[خب [ف (منف، فا، مح، رفع) (متق، مف، بؤ جد، نصب)]]'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 156.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 20.'
      ]
    },
    {
      id: 8,
      title: 'القوتان الإنجازيتان الحرفية والمستلزمة ويؤشّر لهما بمخصّص حمل "مركب"',
      content: [
        'بعد ذلك يتمّ إدماج مؤشر القوة الإنجازيّة الصّفر فتنقل البنية الأخيرة إلى البنية التالية:',
        '[ف (منف، فا، مح، رفع) (متق، مف، بؤ جد، نصب)]',
        'هذه البنية المُتَحصّل عليها غير مرتّبة لا تقوم بين مكوّناتها أيّة علاقة خطيّة. لترتيب مكوّنات هذه البنية، تُجرى قواعد',
        'الموقعة على النحو التالي:'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 157–158.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 20.'
      ]
    },
    {
      id: 9,
      title: 'من البنية الوظيفية إلى بنية مكونية',
      content: [
        'بعد ذلك يتمّ إدماج مؤشر القوة الإنجازيّة الصّفر فتنقل البنية الأخيرة إلى البنية التالية:',
        '[ف (منف، فا، مح، رفع) (متق، مف، بؤ جد، نصب)]',
        'هذه البنية المُتَحصّل عليها غير مرتّبة لا تقوم بين مكوّناتها أيّة علاقة خطيّة. لترتيب مكوّنات هذه البنية، تُجرى قواعد',
        'الموقعة على النحو التالي:'
      ],
      sources: [
        'أحمد المتوكّل، اللسانيات الوظيفية مدخل نظري، ط2، دار الكتاب الجديد المتحدة، بيروت-لبنان، 2010، ص 163–164–165–166–167.',
        'أحمد المتوكّل، الوظيفة والبنية مقاربات وظيفية لبعض قضايا التركيب في اللغة العربية، د ن، الرباط 1993، ص 21–22.'
      ]
    },
    {
      id: 10,
      title: 'المعلومات المسندة إليها من خلال صورية الحمل في شكل إطـار حملي',
      content: [
        'المعلومات المسندة إليها من خلال صورية الحمل في شكل إطار حملي تتضمن:',
        'التحديد الدقيق للوظائف والعلاقات داخل البنية الحملية',
        '[ف (س1، منف، فا) (س2، متق، مف)]'
      ],
      sources: [
        'أحمد المتوكّل ، البنية الوظيفية مقاربات نظرية ووظيفية لبعض قضايا التركيب في اللغة العربية، جـ 1، د ت، الزيلع 1993، ص.33-32.'
      ]
    }
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
        onClick={() => handleBack('Think')} 
        className={classes.backButton} 
        aria-label="back"
      >
        <ArrowBackIcon style={{ fontSize: '2.5rem' }} />
      </IconButton>

      <Container maxWidth="lg" className={classes.container}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h1" className={classes.pageTitle} dir="rtl">
            قواعد النحو الوظيفي
          </Typography>
        </Fade>

        {/* قسم المصادر PDF */}
        <Fade in={true} timeout={1100}>
          <Box className={classes.sourcesSection}>
            <Box className={classes.sourcesHeader}>
              <LibraryBooksIcon style={{ marginLeft: 12, fontSize: '2rem' }} />
              <Typography className={classes.sourcesTitle}>
                مصادر القواعد النحوية
              </Typography>
            </Box>
            <Box className={classes.sourcesContent}>
              <Typography 
                variant="body1" 
                style={{ 
                  marginBottom: 24, 
                  color: '#666',
                  fontFamily: '"Tajawal", "Cairo", sans-serif',
                  textAlign: 'center'
                }}
                dir="rtl"
              >
                مصادر مرجعية في اللسانيات الوظيفية والنحو الوظيفي العربي متوفرة للتحميل والمراجعة
              </Typography>
              
              <Grid container spacing={3}>
                {pdfFiles.map((pdfFile) => (
                  <Grid item xs={12} md={6} key={pdfFile.id}>
                    <Box className={classes.pdfCard}>
                      <Box className={classes.pdfInfo}>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <PictureAsPdfIcon 
                            style={{ 
                              color: '#28A745', 
                              marginLeft: 8, 
                              fontSize: '1.5rem' 
                            }} 
                          />
                          <Typography className={classes.pdfName} dir="rtl">
                            {pdfFile.name}
                          </Typography>
                        </Box>
                        {pdfFile.uploaded && (
                          <Button
                            className={classes.downloadButton}
                            onClick={() => handleDownload(pdfFile.url, pdfFile.fileName)}
                            startIcon={<GetAppIcon />}
                            size="small"
                          >
                            تحميل
                          </Button>
                        )}
                      </Box>
                      
                      <Typography className={classes.pdfDescription} dir="rtl">
                         {pdfFile.description}
                       </Typography>
                       
                       <Box style={{ 
                         marginTop: 16, 
                         textAlign: 'center',
                         color: '#28A745',
                         fontWeight: 600,
                         fontFamily: '"Tajawal", "Cairo", sans-serif'
                       }}>
                         ✓ ملف PDF متوفر للتحميل
                       </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Fade>

        <Divider style={{ margin: '32px 0', background: 'rgba(255,255,255,0.3)' }} />

        {/* الاختصارات */}
        <Fade in={true} timeout={1200}>
          <Box className={classes.abbreviation} dir="rtl">
            <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
              الرموز والاختصارات:
            </Typography>
            <Typography variant="body1">
              <strong>فعل → ف</strong> • <strong>فاعل → فا</strong> • <strong>مفعول → مف</strong>
            </Typography>
          </Box>
        </Fade>

        {rulesData.map((rule, index) => (
          <Fade 
            key={rule.id} 
            in={true} 
            timeout={1000} 
            style={{ transitionDelay: `${index * 150 + 400}ms` }}
          >
            <Card className={classes.ruleCard}>
              <Box className={classes.ruleHeader}>
                <MenuBookIcon className={classes.ruleIcon} />
                <Typography className={classes.ruleTitle} dir="rtl">
                  {rule.id}. {rule.title}
                </Typography>
              </Box>
              
              <CardContent className={classes.ruleContent}>
                {rule.content.map((text, textIndex) => (
                  <Box key={textIndex}>
                    {text.startsWith('[') && text.endsWith(']') ? (
                      <Box className={classes.formula} dir="ltr">
                        {text}
                      </Box>
                    ) : (
                      <Typography className={classes.ruleText} dir="rtl">
                        {text}
                      </Typography>
                    )}
                  </Box>
                ))}
                
                {/* عرض المصادر */}
                {rule.sources && rule.sources.length > 0 && (
                  <Box className={classes.sourcesContainer}>
                    <Typography className={classes.sourcesTitle} dir="rtl">
                      <BookmarkIcon style={{ marginLeft: 8, fontSize: '1.2rem' }} />
                      المصادر:
                    </Typography>
                    {rule.sources.map((source, sourceIndex) => (
                      <Typography 
                        key={sourceIndex} 
                        className={classes.sourceItem} 
                        dir="rtl"
                      >
                        {source}
                      </Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Fade>
        ))}
      </Container>
    </div>
  );
};

export default Rules;