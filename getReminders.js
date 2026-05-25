require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;

async function getReminders() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('ntfy');
        const reminders = await db.collection('reminders').find({}).toArray();
        return reminders;
    } finally {
        await client.close();
    }
}

module.exports = { getReminders };
