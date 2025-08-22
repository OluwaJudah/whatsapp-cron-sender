require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");

const sendWhatsAppMessages = async () => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointment-reminders`
    );
    console.log("Reminders sent:", res.data);
  } catch (err) {
    console.error("Failed to send reminders", err);
  }
};

// Schedule every Friday at 9:00 AM
cron.schedule(
  "30 14 * * 5",
  () => {
    console.log("Service live", new Date().toISOString());
    sendWhatsAppMessages();
  },
  {
    timezone: "Africa/Johannesburg", // ensures 12:00 SAST regardless of server default
  }
);

console.log("🟢 Cron job initialized...");
