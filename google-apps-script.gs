// Paste this into Extensions > Apps Script on the Google Sheet you want
// responses saved to. See README.md "Collecting responses" section for
// full setup steps.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add header row once, if the sheet is empty.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Received At (server)",
      "Timestamp (client)",
      "Session ID",
      "IP Address",
      "Q1",
      "Q2",
      "Q3",
      "Q4",
      "No Attempts",
      "User Agent",
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.timestamp || "",
    data.sessionId || "",
    data.ip || "",
    data.q1 || "",
    data.q2 || "",
    data.q3 || "",
    data.q4 || "",
    data.noAttempts || 0,
    data.userAgent || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
