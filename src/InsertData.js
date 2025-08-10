import React, { useState } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Container,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Fade,
  Snackbar as MuiSnackbar,
  CircularProgress,
  Divider,
  Chip
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import mainPageBackground from './images.jpeg';
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import StorageIcon from '@material-ui/icons/Storage';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 50%, rgba(212, 165, 116, 0.8) 100%), url(${mainPageBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(4, 0),
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
    marginBottom: theme.spacing(4),
    fontFamily: '"Tajawal", "Cairo", serif',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
      flexDirection: 'column',
    },
  },
  titleIcon: {
    marginLeft: theme.spacing(2),
    fontSize: '3rem',
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
  },
  adminCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: 16,
    marginBottom: theme.spacing(3),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  },
  cardHeader: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    '& .MuiCardHeader-title': {
      fontFamily: '"Tajawal", "Cairo", sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    '& .MuiCardHeader-avatar': {
      backgroundColor: 'transparent',
    },
  },
  deleteHeader: {
    background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
  },
  addHeader: {
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  inputSection: {
    marginBottom: theme.spacing(4),
  },
  inputGrid: {
    marginBottom: theme.spacing(3),
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 8,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 4px 16px rgba(27, 78, 101, 0.2)',
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: '"Tajawal", "Cairo", sans-serif',
      fontWeight: 500,
    },
  },
  selectField: {
    minWidth: 250,
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 8,
    },
    '& .MuiInputLabel-root': {
      fontFamily: '"Tajawal", "Cairo", sans-serif',
      fontWeight: 500,
    },
  },
  actionButton: {
    borderRadius: 10,
    padding: theme.spacing(1.5, 3),
    margin: theme.spacing(1),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #0F3547 0%, #1B4E65 100%)',
    },
  },
  dangerButton: {
    background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #c82333 0%, #dc3545 100%)',
    },
  },
  successButton: {
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #218838 0%, #28a745 100%)',
    },
  },
  sectionLabel: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#1B4E65',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  sectionIcon: {
    marginLeft: theme.spacing(1),
    fontSize: '1.5rem',
  },
  warningBox: {
    marginTop: theme.spacing(3),
    '& .MuiAlert-message': {
      fontFamily: '"Tajawal", "Cairo", sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  ruleChip: {
    margin: theme.spacing(0.5),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontWeight: 600,
  },
}));

const InsertData = () => {
  const classes = useStyles();
  const [words, setWords] = useState(Array(6).fill(""));
  const [irabs, setIrabs] = useState(Array(6).fill(""));
  const [table, setTable] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const apiCall = async (endpoint, data = null, method = 'GET') => {
    setLoading(true);
    try {
      const config = {
        method,
        url: `https://islamirabback3.vercel.app/${endpoint}`,
        ...(data && { data })
      };
      
      const response = await axios(config);
      
      if (response.status === 200) {
        console.log(response.data);
        showSnackbar('تم تنفيذ العملية بنجاح', 'success');
        return response.data;
      }
    } catch (error) {
      console.error('API Error:', error);
      showSnackbar('حدث خطأ أثناء تنفيذ العملية', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTables = () => apiCall('createAllTables');
  const handleDeleteTables = () => apiCall('deleteTables');
  const handleSelectTable = () => apiCall('selecttable', { table }, 'POST');
  const handleDeleteTense = () => apiCall('deleteTenseFromTable', { words, table }, 'POST');
  const handleDeleteOneTable = () => apiCall('deleteOneTable', { table }, 'POST');
  const handleInsertData = () => apiCall('insertOneTable', { words, irabs, table }, 'POST');

  const handleInputChange = (index, value, type) => {
    const setter = type === 'word' ? setWords : setIrabs;
    const current = type === 'word' ? words : irabs;
    const updated = [...current];
    updated[index] = value;
    setter(updated);
  };

  const tableOptions = [
    { value: 'table1', label: 'الإطار الحملي الموسع' },
    { value: 'table2', label: 'محلاتية المحمولات' },
    { value: 'table3', label: 'قواعد إدماج الحدود' },
    { value: 'table4', label: 'الوظائف التداولية' },
    { value: 'table5', label: 'إسناد الوظيفتين' },
    { value: 'table6', label: 'القوة الإنجازية' },
    { value: 'table7', label: 'القوتان الإنجازيتان' },
    { value: 'table8', label: 'قواعد نقل البنية الوظيفية' },
    { value: 'table9', label: 'البنية العامة للحمل' },
    { value: 'table10', label: 'صورنة الحمل' },
  ];

  return (
    <div className={classes.root}>
      {loading && (
        <div className={classes.loadingOverlay}>
          <CircularProgress size={60} style={{ color: '#fff' }} />
        </div>
      )}

      <Container maxWidth="lg" className={classes.container}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h1" className={classes.pageTitle} dir="rtl">
            <SettingsIcon className={classes.titleIcon} />
            لوحة إدارة البيانات
          </Typography>
        </Fade>

        {/* قسم إضافة البيانات */}
        <Fade in={true} timeout={1200}>
          <Card className={classes.adminCard}>
            <CardHeader
              className={`${classes.cardHeader} ${classes.addHeader}`}
              avatar={<AddCircleIcon />}
              title="إضافة بيانات جديدة"
              dir="rtl"
            />
            <CardContent className={classes.cardContent}>
              <Box className={classes.inputSection}>
                <Typography className={classes.sectionLabel} dir="rtl">
                  <EditIcon className={classes.sectionIcon} />
                  الكلمات
                </Typography>
                <Grid container spacing={2} className={classes.inputGrid}>
                  {words.map((word, index) => (
                    <Grid item xs={12} sm={6} md={2} key={index}>
                      <TextField
                        variant="outlined"
                        className={classes.inputField}
                        value={word}
                        onChange={(e) => handleInputChange(index, e.target.value, 'word')}
                        placeholder={`كلمة ${index + 1}`}
                        fullWidth
                        dir="rtl"
                      />
                    </Grid>
                  ))}
                </Grid>

                <Typography className={classes.sectionLabel} dir="rtl" style={{ marginTop: 24 }}>
                  <StorageIcon className={classes.sectionIcon} />
                  الإعراب
                </Typography>
                <Grid container spacing={2} className={classes.inputGrid}>
                  {irabs.map((irab, index) => (
                    <Grid item xs={12} sm={6} md={2} key={index}>
                      <TextField
                        variant="outlined"
                        className={classes.inputField}
                        value={irab}
                        onChange={(e) => handleInputChange(index, e.target.value, 'irab')}
                        placeholder={`إعراب ${index + 1}`}
                        fullWidth
                        dir="rtl"
                      />
                    </Grid>
                  ))}
                </Grid>

                <FormControl variant="outlined" className={classes.selectField}>
                  <InputLabel dir="rtl">اختر القاعدة</InputLabel>
                  <Select
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                    label="اختر القاعدة"
                    dir="rtl"
                  >
                    <MenuItem value="">
                      <em>اختر القاعدة</em>
                    </MenuItem>
                    {tableOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value} dir="rtl">
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box textAlign="center" marginTop={3}>
                  <Button 
                    className={`${classes.actionButton} ${classes.successButton}`}
                    onClick={handleInsertData}
                    startIcon={<CloudUploadIcon />}
                    disabled={!table || loading}
                  >
                    تحميل البيانات
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* قسم إدارة الجداول */}
        <Fade in={true} timeout={1400}>
          <Card className={classes.adminCard}>
            <CardHeader
              className={classes.cardHeader}
              avatar={<StorageIcon />}
              title="إدارة الجداول"
              dir="rtl"
            />
            <CardContent className={classes.cardContent}>
              <Box textAlign="center">
                <Button 
                  className={`${classes.actionButton} ${classes.primaryButton}`}
                  onClick={handleCreateTables}
                  startIcon={<AddCircleIcon />}
                >
                  إنشاء جميع الجداول
                </Button>
                <Button 
                  className={`${classes.actionButton} ${classes.primaryButton}`}
                  onClick={handleSelectTable}
                  startIcon={<StorageIcon />}
                  disabled={!table}
                >
                  اختيار الجدول
                </Button>
              </Box>

              <Alert severity="info" className={classes.warningBox} dir="rtl">
                <Typography>
                  القواعد المتاحة في النظام:
                </Typography>
                <Box marginTop={2}>
                  {tableOptions.map((option, index) => (
                    <Chip 
                      key={index}
                      label={option.label}
                      className={classes.ruleChip}
                      color={table === option.value ? "primary" : "default"}
                      variant={table === option.value ? "default" : "outlined"}
                    />
                  ))}
                </Box>
              </Alert>
            </CardContent>
          </Card>
        </Fade>

        {/* قسم حذف البيانات */}
        <Fade in={true} timeout={1600}>
          <Card className={classes.adminCard}>
            <CardHeader
              className={`${classes.cardHeader} ${classes.deleteHeader}`}
              avatar={<DeleteIcon />}
              title="حذف البيانات"
              dir="rtl"
            />
            <CardContent className={classes.cardContent}>
              <Box textAlign="center">
                <Button 
                  className={`${classes.actionButton} ${classes.dangerButton}`}
                  onClick={handleDeleteTense}
                  startIcon={<DeleteIcon />}
                  disabled={!table}
                >
                  حذف الجملة من القاعدة
                </Button>
                <Button 
                  className={`${classes.actionButton} ${classes.dangerButton}`}
                  onClick={handleDeleteOneTable}
                  startIcon={<DeleteIcon />}
                  disabled={!table}
                >
                  حذف جدول القاعدة
                </Button>
                <Button 
                  className={`${classes.actionButton} ${classes.dangerButton}`}
                  onClick={handleDeleteTables}
                  startIcon={<WarningIcon />}
                >
                  حذف جميع الجداول
                </Button>
              </Box>

              <Alert severity="error" className={classes.warningBox} dir="rtl">
                <Typography>
                  <strong>تحذير:</strong> عمليات الحذف نهائية ولا يمكن التراجع عنها. تأكد من اختيارك قبل المتابعة.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Fade>
      </Container>

      {/* Snackbar للرسائل */}
      <MuiSnackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </MuiSnackbar>
    </div>
  );
};

export default InsertData;