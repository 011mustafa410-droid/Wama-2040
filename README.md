# موقع مشروع WAMA

## هيكل الملفات
```
website-wama/
├── index.html        الصفحة الرئيسية
├── style.css         التنسيقات
├── script.js         التفاعل (المحاكاة، الداشبورد، العدادات، النموذج…)
├── manifest.json     تطبيق الويب (PWA)
├── vercel.json       ترويسات الحماية والكاش (Vercel)
├── _headers          نفس الترويسات لـ Netlify
├── robots.txt        محركات البحث
└── assets/
    ├── images/       الشعار والأيقونات وصورة المشاركة
    └── Book_WAMA.pdf ← حط كتاب المشروع هنا (غير موجود لسه)
```

## قبل النشر: 3 حاجات لازم تغيّرها
1. **كتاب المشروع:** حط الملف في `assets/Book_WAMA.pdf` بنفس الاسم.
2. **النموذج:** اعمل حساب مجاني على Formspree وغيّر `YOUR_FORM_ID` في `index.html`.
3. **رابط الموقع:** غيّر `YOUR-SITE.vercel.app` (في `og:url` و`og:image`) لرابط موقعك الحقيقي، عشان صورة المعاينة تظهر في واتساب ولينكدإن.

## النشر
- **Vercel:** اسحب مجلد `website-wama` على vercel.com/new.
- **Netlify:** اسحب المجلد على app.netlify.com/drop (بيقرأ `_headers`).

بعد النشر اعمل QR Code للرابط واطبعه على البوستر.

## ملاحظات
- لو غيّرت أي ملف جوه `assets/` بعد النشر، غيّر اسمه (مثلاً `Book_WAMA_v2.pdf`)، لأن الكاش مضبوط على سنة كاملة.
- `Permissions-Policy` مفتوح للميكروفون (`microphone=(self)`) عشان المساعد الصوتي في شاشة العرض يشتغل.

## وضع الزائر والمساعد الذكي (جديد)
- الملفات الجديدة: `guest.js` و`api/chat.js`، وتعديلات في `index.html` و`script.js` و`style.css` و`vercel.json`.
- **تفعيل الشات الذكي:** في Vercel ← Project ← Settings ← Environment Variables أضف `ANTHROPIC_API_KEY` (من console.anthropic.com) ثم اعمل Redeploy. اختياري: `ANTHROPIC_MODEL` (الافتراضي `claude-haiku-5-5`).
- من غير المفتاح الشات بيشتغل بردود جاهزة، ومفيش أي شيء بيبوّظ.
- وضع الزائر بيخفي: صفحة الفريق، عدد الأعضاء، سطر الميزانية، وكتاب المشروع. الشات مبرمج على معلومات عامة بس (من غير أسماء ولا IDs ولا تكلفة).
