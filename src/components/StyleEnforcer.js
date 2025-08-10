import { useEffect } from 'react';

const StyleEnforcer = () => {
  useEffect(() => {
    // ضمان تطبيق الخطوط والأنماط بشكل صحيح
    const enforceStyles = () => {
      // التأكد من اتجاه النص
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      
      // التأكد من تطبيق الخطوط
      const bodyStyle = document.body.style;
      bodyStyle.fontFamily = '"Tajawal", "Cairo", "Noto Sans Arabic", "Tajawal-fallback", Tahoma, Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      bodyStyle.direction = 'rtl';
      bodyStyle.textAlign = 'right';
      bodyStyle.fontDisplay = 'swap';
      
      // إضافة CSS للتأكد من عرض الأنماط بشكل صحيح
      const style = document.createElement('style');
      style.textContent = `
        * {
          font-family: "Tajawal", "Cairo", "Noto Sans Arabic", "Tajawal-fallback", Tahoma, Arial, sans-serif !important;
          font-display: swap !important;
        }
        
        .MuiTypography-root,
        .MuiButton-root,
        .MuiInputBase-root,
        .MuiFormLabel-root,
        .MuiMenuItem-root,
        .MuiListItemText-root {
          font-family: "Tajawal", "Cairo", "Noto Sans Arabic", "Tajawal-fallback", Tahoma, Arial, sans-serif !important;
          font-display: swap !important;
        }
        
        [dir="rtl"] {
          direction: rtl !important;
          text-align: right !important;
        }
        
        body {
          font-family: "Tajawal", "Cairo", "Noto Sans Arabic", "Tajawal-fallback", Tahoma, Arial, sans-serif !important;
          direction: rtl !important;
          font-display: swap !important;
        }
        
        /* ضمان عدم ظهور النص بشكل غريب أثناء تحميل الخطوط */
        .font-loading {
          visibility: hidden;
        }
        
        .fonts-loaded {
          visibility: visible;
        }
      `;
      
      // إزالة النمط القديم إن وجد
      const oldStyle = document.getElementById('style-enforcer');
      if (oldStyle) {
        oldStyle.remove();
      }
      
      style.id = 'style-enforcer';
      document.head.appendChild(style);
    };

    // تطبيق الأنماط فوراً
    enforceStyles();

    // تطبيق الأنماط عند تحميل الخطوط
    if (document.fonts) {
      document.fonts.ready.then(enforceStyles);
    }

    // تطبيق الأنماط بعد تأخير قصير للتأكد
    const timer = setTimeout(enforceStyles, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null; // هذا المكون لا يعرض أي شيء، فقط ينفذ الكود
};

export default StyleEnforcer;