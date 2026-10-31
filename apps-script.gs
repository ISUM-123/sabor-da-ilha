/**
 * Google Apps Script – recebe os dados do formulário e grava numa Google Sheet.
 * Cole este código em Extensões > Apps Script da sua planilha.
 */
const SHEET_NAME = 'Respostas';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const data = e.parameter;
    const keys = Object.keys(data).filter(k => k !== 'website'); // 'website' = honeypot anti-spam
    if (data.website) return json({ ok: false, error: 'spam' });

    let headers = sheet.getLastRow() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    if (!headers.length) { headers = ['data_envio'].concat(keys); sheet.appendRow(headers); }
    keys.forEach(k => { if (headers.indexOf(k) === -1) { headers.push(k); sheet.getRange(1, headers.length).setValue(k); } });

    const row = headers.map(h => h === 'data_envio' ? new Date() : (data[h] || ''));
    sheet.appendRow(row);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
