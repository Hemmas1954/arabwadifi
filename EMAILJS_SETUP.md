# دليل إعداد EmailJS 📧

## خطوات الإعداد

### 1. إنشاء حساب EmailJS
- اذهب إلى [EmailJS](https://www.emailjs.com/)
- أنشئ حساب جديد أو سجل الدخول

### 2. إعداد خدمة البريد الإلكتروني
1. اذهب إلى **Email Services**
2. اضغط **Add New Service**
3. اختر مزود البريد (Gmail, Outlook, Yahoo, إلخ)
4. اتبع التعليمات لربط حسابك
5. احفظ **Service ID**

### 3. إنشاء قالب الرسالة
1. اذهب إلى **Email Templates**
2. اضغط **Create New Template**
3. استخدم القالب التالي:

```
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
```

4. احفظ **Template ID**

### 4. الحصول على المفتاح العام
1. اذهب إلى **Account** → **General**
2. انسخ **Public Key**

### 5. تحديث ملف التكوين
افتح `src/emailConfig.js` وحدث القيم التالية:

```javascript
export const emailConfig = {
  serviceId: 'service_xxxxxxx',     // ضع Service ID هنا
  templateId: 'template_xxxxxxx',   // ضع Template ID هنا
  publicKey: 'xxxxxxxxxxxxxxx',     // ضع Public Key هنا
  toEmail: 'your-email@gmail.com'   // ضع بريدك الإلكتروني هنا
};
```

## اختبار الإعداد

1. شغل التطبيق: `npm start`
2. اذهب إلى نافذة "اتصل بنا"
3. املأ النموذج وأرسل رسالة تجريبية
4. تحقق من بريدك الإلكتروني

## استكشاف الأخطاء

### خطأ: "Service ID not found"
- تأكد من صحة Service ID
- تأكد من تفعيل الخدمة في EmailJS

### خطأ: "Template ID not found"
- تأكد من صحة Template ID
- تأكد من حفظ القالب

### خطأ: "Public Key invalid"
- تأكد من صحة Public Key
- تأكد من تفعيل المفتاح

### خطأ: "Failed to send email"
- تحقق من اتصال الإنترنت
- تأكد من صحة جميع الإعدادات
- تحقق من حدود الإرسال في حسابك

## الأمان

⚠️ **تحذير**: لا تشارك مفاتيح EmailJS في المستودعات العامة

## الدعم

للمساعدة الإضافية، راجع [وثائق EmailJS](https://www.emailjs.com/docs/)