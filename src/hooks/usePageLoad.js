import { useState, useEffect } from 'react';

const usePageLoad = (delay = 500) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkFonts = async () => {
      try {
        // التحقق من تحميل الخطوط العربية
        const fonts = [
          'Tajawal',
          'Cairo', 
          'Noto Sans Arabic'
        ];
        
        // انتظار تحميل جميع الخطوط
        const fontPromises = fonts.map(font => 
          document.fonts.load(`16px ${font}`)
        );
        
        await Promise.allSettled(fontPromises);
        
        // التحقق من أن الخطوط متاحة فعلاً
        const fontChecks = fonts.map(font => 
          document.fonts.check(`16px ${font}`)
        );
        
        return fontChecks.some(check => check);
      } catch (error) {
        console.warn('Font loading check failed:', error);
        return false;
      }
    };

    const checkStyles = () => {
      try {
        // التحقق من تحميل CSS
        const stylesheets = Array.from(document.styleSheets);
        return stylesheets.length > 0;
      } catch (error) {
        console.warn('Style check failed:', error);
        return false;
      }
    };

    const loadPage = async () => {
      // انتظار تحميل DOM الكامل
      if (document.readyState !== 'complete') {
        await new Promise(resolve => {
          const handleLoad = () => {
            resolve();
          };
          
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', handleLoad, { once: true });
          }
        });
      }

      // انتظار تحميل الخطوط والأنماط
      await Promise.all([
        checkFonts(),
        new Promise(resolve => setTimeout(resolve, 200))
      ]);
      
      // التحقق من الأنماط
      checkStyles();
      
      // تأخير نهائي لضمان التحميل الكامل
      setTimeout(() => {
        // إضافة class للجسم لتأكيد تحميل الخطوط
        document.body.classList.add('fonts-loaded');
        document.body.classList.remove('font-loading');
        setIsLoaded(true);
      }, delay);
    };

    // إضافة class للتحميل
    document.body.classList.add('font-loading');
    
    loadPage();
  }, [delay]);

  return isLoaded;
};

export default usePageLoad;