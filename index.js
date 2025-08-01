require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");

const sendWhatsAppMessages = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointment-reminders`
    );
    console.log("Reminders sent:", res.data);
  } catch (err) {
    console.error("Failed to send reminders", err);
  }
};

// Schedule every Friday at 9:00 AM
cron.schedule('0 12 * * 5', () => {
  console.log("⏰ Running scheduled WhatsApp job at 9:00 AM Friday");
  sendWhatsAppMessages();
});
