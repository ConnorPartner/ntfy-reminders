require('dotenv').config();
const cron = require('node-cron');
const gr = require('./getReminders');

const host = process.env.NTFY_HOST;
const topic = process.env.NTFY_TOPIC;
const token = process.env.NTFY_TOKEN;

async function sendNotification(title, message) {
  const response = await fetch(`https://${host}/${topic}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Title: title,
      Priority: "default",
    },
    body: message,
  });

  console.log("~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^")
  console.log(`Notification sent: ${title}`);
  console.log(`Status: ${response.status}`);
  console.log("~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^")
}

let scheduledReminders = [];

async function scheduleReminders() {
  scheduledReminders.forEach(job => job.stop());
  scheduledReminders = [];

  const reminders = await gr.getReminders();
  reminders.forEach(reminder => {
    const job = cron.schedule(reminder.cron, () => {
      sendNotification(reminder.title, reminder.message);
    }, { timezone: process.env.CRON_TZ});
    scheduledReminders.push(job);
  });
  console.log(`Scheduled ${reminders.length} reminder(s).`);
}

cron.schedule('* * * * *', async () => {
  console.log('Refreshing reminders...');
  await scheduleReminders();
});

scheduleReminders()
