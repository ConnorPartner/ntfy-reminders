'use server'

import { MongoClient, ObjectId } from "mongodb";

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

export async function getReminder(id: string){
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db('ntfy');
    const result = await db.collection('reminders').findOne({ _id: new ObjectId(id) });
    if (!result) return null;
    return { _id: result._id.toString(), title: result.title, message: result.message, cron: result.cron };
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
    const result = await db.collection<Reminder>('reminders').find({}).toArray();
    const reminders = result.map(({ _id, title, message, cron }) => ({
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

export async function deleteReminder(id: string){
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db('ntfy');
    const result = await db.collection('reminders').deleteOne({ _id: new ObjectId(id) });
    console.log('Deleted reminder with id:', id, 'Result:', result);
    return { deletedCount: result.deletedCount, status: 'success' };
  } finally {
    await client.close();
  }
}

export async function updateReminder(reminder: Reminder){
  if (!reminder._id) {
    throw new Error('Reminder must have an _id to be updated');
  }

  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db('ntfy');
    const result = await db.collection('reminders').updateOne(
      { _id: new ObjectId(reminder._id) },
      { $set: { title: reminder.title, message: reminder.message, cron: reminder.cron } }
    );
    console.log('Updated reminder with id:', reminder._id, 'Result:', result);
    return { modifiedCount: result.modifiedCount, status: 'success' };
  } finally {
    await client.close();
  }
}