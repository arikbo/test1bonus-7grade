// Google Apps Script – קולט תוצאות מהאתר וכותב לכל מורה לשונית נפרדת בגיליון.
const HEAD = ['זמן','מורה','כיתה','שם התלמיד','ניסיון','ציון','מתוך','אחוז','שאלות לתרגול'];
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(d.teacher);
  if (!sh) { sh = ss.insertSheet(d.teacher); sh.appendRow(HEAD); sh.setRightToLeft(true); sh.setFrozenRows(1); }
  sh.appendRow([new Date(d.ts), d.teacher, d.cls, d.name, d.attempt, d.score, d.max, d.pct / 100, d.wrong]);
  sh.getRange(sh.getLastRow(), 8).setNumberFormat('0%');
  return ContentService.createTextOutput('ok');
}
// טבלת סיכום לכל מורה (תלמיד אחד בשורה: מספר ניסיונות, ציון אחרון, ציון הכי גבוה)
function summarize() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheets().filter(s => !s.getName().startsWith('סיכום')).forEach(sh => {
    const rows = sh.getDataRange().getValues().slice(1), by = {};
    rows.forEach(r => { const k = r[2] + '|' + r[3]; (by[k] = by[k] || []).push(r); });
    const name = 'סיכום ' + sh.getName();
    let out = ss.getSheetByName(name) || ss.insertSheet(name);
    out.clear(); out.setRightToLeft(true);
    out.appendRow(['כיתה','שם התלמיד','מספר ניסיונות','ציון אחרון (%)','ציון הכי גבוה (%)','ניסיון אחרון']);
    Object.values(by).sort((a, b) => a[0][2].localeCompare(b[0][2]) || a[0][3].localeCompare(b[0][3])).forEach(g => {
      const p = g.map(r => r[7] * 100);
      out.appendRow([g[0][2], g[0][3], g.length, Math.round(p[p.length - 1]), Math.round(Math.max(...p)), g[g.length - 1][0]]);
    });
  });
}
