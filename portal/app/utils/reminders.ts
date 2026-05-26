'use server'

import { MongoClient } from "mongodb";

export interface Reminder {
  _id?: string;
  title: string;
  message: string;
  cron: string;
}

export type NewReminder = Omit<Reminder, '_id'>;

export async function addReminder(reminder: NewReminder){
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db('ntfy');
    const result = await db.collection('reminders').insertOne(reminder);
    console.log('Inserted reminder with id:', result.insertedId);
    return { insertedId: result.insertedId.toString(), status: 'success' };
  } finally {
    await client.close();
  }
}

export async function getReminders(){
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db('ntfy');
    const docs = await db.collection<Reminder>('reminders').find({}).toArray();
    const reminders = docs.map(({ _id, title, message, cron }) => ({
      _id: _id.toString(),
      title,
      message,
      cron,
    }));
    return { reminders };
  } finally {
    await client.close();
  }
}
