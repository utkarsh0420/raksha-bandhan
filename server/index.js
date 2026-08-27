import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');
const LOG_FILE = path.join(__dirname, 'sent_emails.log');

// Try loading .env if exists (Node 20.6+ built-in)
if (typeof process.loadEnvFile === 'function') {
  const rootEnv = path.join(__dirname, '..', '.env');
  const localEnv = path.join(__dirname, '.env');
  if (fs.existsSync(rootEnv)) {
    try { process.loadEnvFile(rootEnv); } catch (e) {}
  } else if (fs.existsSync(localEnv)) {
    try { process.loadEnvFile(localEnv); } catch (e) {}
  } else {
    try { process.loadEnvFile(); } catch (e) {}
  }
}

const app = express();
const PORT = process.env.PORT || 5000;
const TARGET_EMAIL = 'utkarsh0420nikam@gmail.com';

app.use(cors());
app.use(express.json());

// Helper to read data
function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data:', err);
  }
  return {
    stats: { hugsCount: 1, rakhisTied: 1, wishesCount: 0 },
    messages: []
  };
}

// Helper to write data
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data:', err);
  }
}

// Email Sender Helper: Dual-Channel Delivery (FormSubmit Cloud + Nodemailer SMTP)
async function sendSisterNoteEmail({ sender, text, emoji, date }) {
  const emailSubject = `💌 Raksha Bandhan Note from your Sister (${sender}) ${emoji}`;
  const emailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 2px solid #D4AF37; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(135deg, #881337 0%, #E11D48 100%); padding: 24px; text-align: center; color: #ffffff;">
        <span style="font-size: 32px;">🪢</span>
        <h1 style="margin: 8px 0 4px 0; font-size: 24px; font-weight: bold; color: #FFF8E7;">Happy Raksha Bandhan!</h1>
        <p style="margin: 0; font-size: 14px; color: #FFDFD3;">You received a special note from your sister</p>
      </div>

      <div style="padding: 24px 28px;">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 24px; margin-right: 8px;">${emoji}</span>
          <span style="font-size: 18px; font-weight: bold; color: #1E1435;">From: ${sender}</span>
          <span style="margin-left: auto; font-size: 12px; color: #78716C;">${date}</span>
        </div>

        <div style="background: #FFF7ED; border-left: 4px solid #E11D48; padding: 18px 20px; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #292524; font-style: italic;">
            "${text}"
          </p>
        </div>

        <div style="background: #FAF5FF; border: 1px dashed #C084FC; padding: 14px 18px; border-radius: 10px; font-size: 13px; color: #581C87;">
          🧸 <strong>Teddy Bear Note:</strong> "A sister not blooded by birth, but closer than any blood relation forever!"
        </div>
      </div>

      <div style="background: #F5F5F4; padding: 16px 24px; text-align: center; font-size: 12px; color: #78716C; border-top: 1px solid #E7E5E4;">
        Sent automatically from your Sister's Raksha Bandhan interactive web portal to <strong>${TARGET_EMAIL}</strong>
      </div>
    </div>
  `;

  // 1. Log dispatch to sent_emails.log
  const logEntry = `[${new Date().toISOString()}] To: ${TARGET_EMAIL} | From: ${sender} | Note: "${text}"\n`;
  try {
    fs.appendFileSync(LOG_FILE, logEntry, 'utf-8');
  } catch (e) {
    console.error('Failed to log email:', e);
  }

  // 2. Dispatch via FormSubmit Cloud Delivery
  let formSubmitDispatched = false;
  try {
    const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'http://localhost:5173',
        'Origin': 'http://localhost:5173',
        'User-Agent': 'RakshaBandhanBackend/1.0'
      },
      body: JSON.stringify({
        name: `Sister ${sender}`,
        _subject: emailSubject,
        message: `"${text}"\n\n- Sent with love by your dearest sister, ${sender} ${emoji}\nDate: ${date}\nDelivered automatically from your Raksha Bandhan Portal to ${TARGET_EMAIL}`,
        _captcha: 'false',
        _template: 'box'
      })
    });
    const fsData = await fsRes.json();
    console.log('📬 FormSubmit Cloud Dispatch response:', fsData);
    formSubmitDispatched = true;
  } catch (fsErr) {
    console.warn('FormSubmit cloud dispatch error:', fsErr.message);
  }

  // 3. Configure Gmail SMTP transporter if credentials provided
  const smtpUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const info = await transporter.sendMail({
        from: `"Raksha Bandhan Portal" <${smtpUser}>`,
        to: TARGET_EMAIL,
        subject: emailSubject,
        html: emailHtml,
        text: `Raksha Bandhan Note from ${sender}: "${text}"`
      });

      console.log(`✉️ Email successfully dispatched to ${TARGET_EMAIL} via Gmail SMTP! MessageId:`, info.messageId);
      return { success: true, method: 'smtp_gmail', target: TARGET_EMAIL, messageId: info.messageId };
    } catch (smtpErr) {
      console.warn('⚠️ SMTP send error with provided credentials:', smtpErr.message);
    }
  }

  return { success: true, method: formSubmitDispatched ? 'cloud_formsubmit' : 'logged_and_prepared', target: TARGET_EMAIL };
}

// Health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', festival: 'Raksha Bandhan 2026', targetEmail: TARGET_EMAIL, time: new Date().toISOString() });
});

// Stats route
app.get('/api/stats', (req, res) => {
  const data = readData();
  res.json(data.stats);
});

// Increment Hugs
app.post('/api/hug', (req, res) => {
  const data = readData();
  data.stats.hugsCount = (data.stats.hugsCount || 0) + 1;
  writeData(data);
  res.json({ success: true, hugsCount: data.stats.hugsCount });
});

// Tie Rakhi
app.post('/api/tie-rakhi', (req, res) => {
  const data = readData();
  data.stats.rakhisTied = (data.stats.rakhisTied || 0) + 1;
  writeData(data);
  res.json({ success: true, rakhisTied: data.stats.rakhisTied });
});

// Get all messages
app.get('/api/messages', (req, res) => {
  const data = readData();
  res.json(data.messages);
});

// Post sister's message/reply + Email to utkarsh0420nikam@gmail.com
app.post('/api/messages', async (req, res) => {
  const { sender, text, emoji } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const data = readData();
  const sisterSender = sender && sender.trim() ? sender.trim() : 'Dearest Sister';
  const sisterEmoji = emoji || '❤️';
  const currentDateStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newMessage = {
    id: Date.now(),
    sender: sisterSender,
    text: text.trim(),
    emoji: sisterEmoji,
    date: currentDateStr
  };

  data.messages.unshift(newMessage);
  data.stats.wishesCount = data.messages.length;
  writeData(data);

  // Send Email Notification to Utkarsh
  const emailResult = await sendSisterNoteEmail({
    sender: sisterSender,
    text: text.trim(),
    emoji: sisterEmoji,
    date: currentDateStr
  });

  res.json({
    success: true,
    message: newMessage,
    emailResult,
    targetEmail: TARGET_EMAIL
  });
});

app.listen(PORT, () => {
  console.log(`🌸 Raksha Bandhan backend service running on http://localhost:${PORT}`);
  console.log(`📧 Sister notes will be delivered to: ${TARGET_EMAIL}`);
});
