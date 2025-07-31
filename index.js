require('dotenv').config();
const cron = require('node-cron');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Your list of recipients (in 'whatsapp:+number' format)
const recipients = [
  'whatsapp:+12345678901',
  'whatsapp:+10987654321',
];

const sendWhatsAppMessages = async () => {
  const messageText = '📣 Hello! This is your Friday morning reminder from Twilio WhatsApp + Node.js!';

  for (const to of recipients) {
    try {
      const msg = await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to,
        body: messageText,
      });
      console.log(`✅ Message sent to ${to}: SID ${msg.sid}`);
    } catch (err) {
      console.error(`❌ Failed to send to ${to}:`, err.message);
    }
  }
};

// Schedule every Friday at 9:00 AM
cron.schedule('0 9 * * 5', () => {
  console.log('⏰ Running scheduled WhatsApp job at 9:00 AM Friday');
  sendWhatsAppMessages();
});
