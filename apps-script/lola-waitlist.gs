// Lumane — Lola Waitlist intake
//
// Receives waitlist submissions from /lola/ and appends them to the
// "Submissions" tab of the spreadsheet this script is bound to.
//
// Frontend contract (see lola/index.html):
//   POST <web-app /exec URL>
//   Content-Type: text/plain;charset=utf-8     // avoids CORS preflight
//   Body: JSON.stringify({
//     formType:  'lola-waitlist',
//     firstName, lastName, role, email, phone, userAgent,
//   })
// Response: { ok: true } | { ok: false, error, fields }

const SHEET_NAME = 'Submissions';
const HEADERS = [
  'timestamp', 'formType', 'firstName', 'lastName', 'role',
  'email', 'phone', 'userAgent',
];
const VALID_ROLES = ['caregiver', 'patient', 'professional', 'other'];

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '{}';
    const body = JSON.parse(raw);

    const firstName = String(body.firstName || '').trim();
    const lastName  = String(body.lastName  || '').trim();
    const role      = String(body.role      || '').trim();
    const email     = String(body.email     || '').trim();
    const phone     = String(body.phone     || '').trim();
    const userAgent = String(body.userAgent || '').trim();

    const fields = {};
    if (!firstName) fields.firstName = 'Required';
    if (!lastName)  fields.lastName  = 'Required';
    if (!role)                                 fields.role = 'Required';
    else if (VALID_ROLES.indexOf(role) === -1) fields.role = 'Invalid';
    if (!email) fields.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'Enter a valid email';

    if (Object.keys(fields).length) {
      return jsonResponse_({ ok: false, error: 'Validation failed', fields: fields });
    }

    const sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date(), 'lola-waitlist',
      firstName, lastName, role, email, phone, userAgent,
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: 'Server error: ' + ((err && err.message) || err) });
  }
}

// Sanity check — visit the /exec URL in a browser to confirm the deploy is live.
function doGet() {
  return jsonResponse_({ ok: true, service: 'lola-waitlist' });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
