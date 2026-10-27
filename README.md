# דפי חזרה – מתמטיקה כיתה ז׳

## 1. איסוף נתונים (Google Sheets, כ-5 דקות)
1. צרו Google Sheet חדש → תפריט **Extensions → Apps Script**.
2. הדביקו את התוכן של `apps-script.gs` ושמרו.
3. **Deploy → New deployment → Web app**: Execute as: *Me*, Who has access: *Anyone* → Deploy ואשרו הרשאות.
4. העתיקו את כתובת ה-Web app (נגמרת ב-`/exec`) והדביקו ב-`config.js` במקום המחרוזת הריקה.

כל מורה מקבל לשונית נפרדת בשמו (נוצרת אוטומטית). להרצת טבלת סיכום לכל מורה: הריצו את הפונקציה `summarize`.
לשליחה למורה: בלשונית שלו → File → Download → Excel/PDF, או Share.

## 2. העלאה ל-GitHub (פרסום אוטומטי)
1. צרו repository חדש ב-GitHub (ציבורי), והעלו אליו את כל הקבצים כולל התיקייה `.github`
   (Add file → Upload files, גררו את התיקייה).
2. ב-**Settings → Pages**: Source = **GitHub Actions**.
3. בכל העלאה/שינוי ב-`main` האתר מתפרסם לבד בכתובת `https://<שם-משתמש>.github.io/<שם-repo>/`.
