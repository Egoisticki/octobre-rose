/**
 * Pink October registration endpoint for a Google Sheet.
 * Bind this script to the target spreadsheet, then deploy it as a Web app.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  let lockAcquired = false;

  try {
    lock.waitLock(10000);
    lockAcquired = true;

    const data = JSON.parse(e.postData.contents);
    const validationError = validateRegistration_(data);

    if (validationError) {
      return json_({ success: false, error: validationError });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
    if (!sheet) {
      return json_({ success: false, error: 'Registrations sheet not found.' });
    }

    sheet.appendRow([
      new Date(),
      safeCell_(data.name),
      safeCell_(data.discord),
      safeCell_(data.phone),
      data.availability.join(', '),
      safeCell_(data.time),
      safeCell_(data.notes || ''),
      data.standCommitment === true ? 'Yes' : 'No',
    ]);

    return json_({ success: true });
  } catch (error) {
    return json_({ success: false, error: 'Unable to save registration.' });
  } finally {
    if (lockAcquired) lock.releaseLock();
  }
}

function validateRegistration_(data) {
  if (!data || typeof data !== 'object') return 'Invalid payload.';
  if (typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.length > 80) return 'Invalid name.';
  if (typeof data.discord !== 'string' || data.discord.trim().length < 2 || data.discord.length > 64) return 'Invalid Discord username.';
  if (typeof data.phone !== 'string' || !/^(?:0[567]\d{8}|\+213[567]\d{8})$/.test(data.phone.trim())) return 'Invalid phone number.';

  const allowedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (!Array.isArray(data.availability) || data.availability.length < 1 || data.availability.some(function(day) { return allowedDays.indexOf(day) === -1; })) return 'Invalid availability.';

  const allowedTimes = ['Morning', 'Afternoon', 'All Day', 'Depends on the day'];
  if (allowedTimes.indexOf(data.time) === -1) return 'Invalid time slot.';
  if (typeof data.notes !== 'string' || data.notes.length > 500) return 'Invalid notes.';
  if (data.standCommitment !== true) return 'Stand commitment is required.';

  return '';
}

// Prevent spreadsheet formulas from being injected through user-entered text.
function safeCell_(value) {
  const text = String(value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
