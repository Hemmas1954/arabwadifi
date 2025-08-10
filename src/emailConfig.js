// إعدادات EmailJS
// يرجى تحديث هذه القيم بالمعلومات الخاصة بحسابك في EmailJS

export const emailConfig = {
  // معرف الخدمة من EmailJS
  serviceId: 'service_zzn2vyn',
  
  // معرف القالب من EmailJS
  templateId: 'template_kizwa5k',
  
  // المفتاح العام من EmailJS
  publicKey: 'netjPnRnL6U97SENJ',
  
  // البريد الإلكتروني المستقبل
  toEmail: 'arabewadifi@gmail.com'
};

// خطوات الإعداد:
// 1. قم بإنشاء حساب في https://www.emailjs.com/
// 2. أنشئ خدمة جديدة (Gmail, Outlook, إلخ)
// 3. أنشئ قالب رسالة جديد
// 4. احصل على المفاتيح المطلوبة
// 5. استبدل القيم أعلاه بالقيم الحقيقية

/* 
مثال على قالب الرسالة في EmailJS:

الموضوع: {{subject}}

مرحباً،

تم استلام رسالة جديدة من موقع تحليل النحو:

الاسم: {{from_name}}
البريد الإلكتروني: {{from_email}}
الموضوع: {{subject}}

الرسالة:
{{message}}

---
تم الإرسال تلقائياً من موقع تحليل النحو الوظيفي
*/