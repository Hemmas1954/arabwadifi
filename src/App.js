import React, { Suspense, useEffect } from 'react';
import './App.css';
import './enhancements.css';
import MainPage from './MainPage';
import Analyze from './Analyze';
import Think from './Think';
import Rules from './Rules';
import InsertData from "./InsertData";
import Capsulate from "./Capsulate";
import IdeaApplication from "./IdeaApplication";
import Adevences from "./Adevences";
import ExitApp from "./ExitApp";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './DataContext';
import GridDelete from './GridDelete';
import PageWrapper from './components/PageWrapper';
import StyleEnforcer from './components/StyleEnforcer';
import Chatbot from './components/Chatbot';
import { Box, CircularProgress } from '@material-ui/core';

// مكون التحميل العام
const GlobalLoading = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    style={{ 
      background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 50%, #D4A574 100%)',
      color: '#FFFFFF'
    }}
  >
    <CircularProgress size={60} style={{ color: '#FFD700' }} />
  </Box>
);

function App() {
  // تطبيق بسيط للخطوط العربية
  useEffect(() => {
    document.body.style.fontFamily = '"Tajawal", "Cairo", "Noto Sans Arabic", "Tajawal-fallback", Tahoma, Arial, sans-serif';
    document.body.style.direction = 'rtl';
  }, []);

  return (
    <Router>
      <DataProvider>
        <StyleEnforcer />
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route exact path="/" element={
              <PageWrapper 
                loadingText="مرحباً بك في المحلل الذكي" 
                subText="جاري تحضير الواجهة الرئيسية"
              >
                <Capsulate />
              </PageWrapper>
            } />
            <Route exact path="/Think" element={
              <PageWrapper 
                loadingText="فكر وحلل بنفسك" 
                subText="جاري تحضير أدوات التحليل الذكي"
              >
                <Think />
              </PageWrapper>
            } />
            <Route exact path="/Analyze" element={
              <PageWrapper 
                loadingText="التحليل النحوي التفاعلي" 
                subText="جاري تحضير الجمل والأمثلة"
              >
                <Analyze />
              </PageWrapper>
            } />
            <Route exact path="/Rules" element={
              <PageWrapper 
                loadingText="قواعد النحو الوظيفي" 
                subText="جاري تحميل المراجع والقواعد"
              >
                <Rules />
              </PageWrapper>
            } />
            <Route exact path="/InsertData" element={
              <PageWrapper 
                loadingText="إدخال النصوص" 
                subText="جاري تحضير محرر النصوص"
              >
                <InsertData />
              </PageWrapper>
            } />
            <Route exact path="/MainPage" element={
              <PageWrapper 
                loadingText="الصفحة الرئيسية" 
                subText="جاري تحضير قائمة الخيارات"
              >
                <MainPage />
              </PageWrapper>
            } />
            <Route exact path="/IdeaApplication" element={
              <PageWrapper 
                loadingText="فريق العمل المبدع" 
                subText="جاري عرض معلومات الفريق"
              >
                <IdeaApplication />
              </PageWrapper>
            } />
            <Route exact path="/Adevences" element={
              <PageWrapper 
                loadingText="إرشادات الاستعمال" 
                subText="جاري تحضير الدليل التفاعلي"
              >
                <Adevences />
              </PageWrapper>
            } />
            <Route exact path="/ExitApp" element={
              <PageWrapper 
                loadingText="شكراً لاستخدام التطبيق" 
                subText="جاري حفظ تقدمك وإنهاء الجلسة"
              >
                <ExitApp />
              </PageWrapper>
            } />
            <Route exact path="/GridDelete" element={
              <PageWrapper 
                loadingText="أدوات التحرير" 
                subText="جاري تحضير واجهة التحرير"
              >
                <GridDelete />
              </PageWrapper>
            } />
          </Routes>
        </Suspense>
        <Chatbot />
      </DataProvider>
    </Router>
  );
}

export default App;
