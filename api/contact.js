import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Cache the Google Sheet connection to make it lightning fast
let cachedSheet = null;

async function getSheet() {
  if (cachedSheet) return cachedSheet;
  
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    return null;
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  cachedSheet = doc.sheetsByIndex[0];
  return cachedSheet;
}

// Security Helper: Sanitize inputs to prevent XSS and Formula Injection
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  // 1. Context-Aware Output Encoding (XSS mitigation for stored data)
  let sanitized = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // 2. Prevent Sheets Formula Injection
  if (/^[=+\-@\t\n\r]/.test(sanitized)) {
    sanitized = "'" + sanitized;
  }

  return sanitized;
}

export default async function handler(req, res) {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS method (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, phone, subject, message } = req.body || {};

  if (!fullName || !email || !subject) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newRow = {
    Date: new Date().toLocaleString(),
    'Full Name': sanitizeInput(fullName),
    Email: sanitizeInput(email),
    'Phone Number': sanitizeInput(phone || ''),
    Subject: sanitizeInput(subject),
    Message: sanitizeInput(message || '')
  };

  try {
    // If GOOGLE_SCRIPT_URL or VITE_GOOGLE_SCRIPT_URL is defined, forward the data directly to the Apps Script Web App
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.VITE_GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: sanitizeInput(fullName),
          email: sanitizeInput(email),
          phone: sanitizeInput(phone || ''),
          subject: sanitizeInput(subject),
          message: sanitizeInput(message || '')
        }),
      });

      if (!response.ok) {
        throw new Error(`Google Apps Script web app responded with status ${response.status}`);
      }

      return res.status(200).json({ success: true, message: 'Message recorded successfully' });
    }

    const sheet = await getSheet();
    
    if (!sheet) {
      console.warn("Google Sheets credentials are not fully set in .env.");
      return res.status(200).json({ success: true, message: 'Message received (Dev mode: Google Sheets not configured)' });
    }

    // Append the new row directly
    await sheet.addRow(newRow);

    return res.status(200).json({ success: true, message: 'Message recorded successfully' });
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    // If there's an authentication expiration or connection error, clear the cache so it retries next time
    cachedSheet = null;
    return res.status(500).json({ error: 'Failed to record message' });
  }
}
