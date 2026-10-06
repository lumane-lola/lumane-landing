// Lumane — Discharge teams Early Access intake
//
// Receives Early Access requests from /discharge-teams/, appends each one to the
// "Submissions" tab of the spreadsheet this script is bound to, and emails a
// notification to NOTIFY_EMAIL.
//
// Frontend contract (see discharge-teams/page.js):
//   POST <web-app /exec URL>
//   Content-Type: text/plain;charset=utf-8     // avoids CORS preflight
//   Body: JSON.stringify({
//     formType: 'discharge-early-access',
//     name, email, role, setting, organization, cityState, phone,
//     utmSource, utmCampaign, userAgent,
//   })
// Response: { ok: true } | { ok: false, error, fields }

const SHEET_NAME = 'Submissions';
const NOTIFY_EMAIL = 'team@lumane.health';
const HEADERS = [
  'timestamp', 'formType', 'name', 'email', 'role', 'setting',
  'organization', 'cityState', 'phone', 'utmSource', 'utmCampaign', 'userAgent',
];
const VALID_ROLES = ['Case manager', 'Social worker', 'Social services director', 'Discharge planner', 'Other'];
const VALID_SETTINGS = ['Skilled nursing facility', 'Hospital', 'Health plan', 'Community organization', 'Other'];

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '{}';
    const body = JSON.parse(raw);
    const get = function (k) { return String(body[k] || '').trim(); };

    const v = {
      name: get('name'),
      email: get('email'),
      role: get('role'),
      setting: get('setting'),
      organization: get('organization'),
      cityState: get('cityState'),
      phone: get('phone'),
      utmSource: get('utmSource'),
      utmCampaign: get('utmCampaign'),
      userAgent: get('userAgent'),
    };

    const fields = {};
    ['name', 'organization', 'cityState'].forEach(function (k) {
      if (!v[k]) fields[k] = 'Required';
    });
    if (!v.role) fields.role = 'Required';
    else if (VALID_ROLES.indexOf(v.role) === -1) fields.role = 'Invalid';
    if (!v.setting) fields.setting = 'Required';
    else if (VALID_SETTINGS.indexOf(v.setting) === -1) fields.setting = 'Invalid';
    if (!v.email) fields.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) fields.email = 'Enter a valid email';

    if (Object.keys(fields).length) {
      return jsonResponse_({ ok: false, error: 'Validation failed', fields: fields });
    }

    const sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date(), 'discharge-early-access',
      v.name, v.email, v.role, v.setting, v.organization, v.cityState,
      v.phone, v.utmSource, v.utmCampaign, v.userAgent,
    ]);

    // The row is saved first, so a mail failure never loses a sign-up.
    try {
      notify_(v, sheet.getParent().getUrl());
    } catch (mailErr) {
      console.error('Notification email failed: ' + mailErr);
    }

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: 'Server error: ' + ((err && err.message) || err) });
  }
}

function notify_(v, sheetUrl) {
  const rows = [
    ['Name', v.name],
    ['Email', v.email],
    ['Phone', v.phone || '—'],
    ['Role', v.role],
    ['Setting', v.setting],
    ['Facility / organization', v.organization],
    ['City and state', v.cityState],
    ['Campaign', [v.utmSource, v.utmCampaign].filter(String).join(' / ') || '—'],
  ];
  const text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') +
    '\n\nAll submissions: ' + sheetUrl;
  const html = '<p>New Early Access request from <b>/discharge-teams</b>:</p><table cellpadding="4">' +
    rows.map(function (r) {
      return '<tr><td style="color:#5D6B87">' + esc_(r[0]) + '</td><td><b>' + esc_(r[1]) + '</b></td></tr>';
    }).join('') +
    '</table><p><a href="' + sheetUrl + '">Open the submissions sheet</a></p>';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: v.email,
    subject: 'Early Access request: ' + v.name + ' (' + v.organization + ')',
    body: text,
    htmlBody: html,
    name: 'Lumane website',
  });
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Sanity check — visit the /exec URL in a browser to confirm the deploy is live.
function doGet() {
  return jsonResponse_({ ok: true, service: 'discharge-early-access' });
}

// Run once from the editor to grant the mail permission and confirm delivery.
function testNotify() {
  notify_({
    name: 'Test Person', email: 'test@example.com', phone: '', role: 'Case manager',
    setting: 'Skilled nursing facility', organization: 'Test Facility', cityState: 'San Jose, CA',
    utmSource: '', utmCampaign: '',
  }, SpreadsheetApp.getActiveSpreadsheet().getUrl());
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
