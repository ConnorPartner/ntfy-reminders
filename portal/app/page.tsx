"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getReminders, deleteReminder, type Reminder } from "./utils/reminders";
import DeleteButton from "./components/DeleteButton";
import { cronToString } from "./utils/cronFunctions";

export default function Home() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    async function fetchReminders() {
      const result = await getReminders();
      setReminders(result.reminders);
    }
    fetchReminders();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {reminders.length === 0 ? (
        <p className="text-gray-500">No reminders yet. Add one!</p>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder._id}
            className="card w-96 bg-base-200 border-base-300 card-md shadow-md my-4"
          >
            <div className="card-body">
              <h2 className="card-title">{reminder.title}</h2>
              <p>{reminder.message}</p>
              <p className="text-gray-500">{cronToString(reminder.cron)}</p>
              <div className="justify-end card-actions">
                <Link href={`/edit/${reminder._id}`} className="btn btn-soft btn-default">Edit</Link>
                <DeleteButton id={reminder._id?.toString()} onDeleted={() => setReminders(prev => prev.filter(r => r._id !== reminder._id))}/>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="mt-6">
        <Link href="/new">
          <button className="btn btn-soft">Add Reminder</button>
        </Link>
      </div>
    </div>
  );
}
