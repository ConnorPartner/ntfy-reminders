'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addReminder } from '@/app/utils/reminders';
import { convertToCron } from "@/app/utils/cronFunctions";
import DayPicker from "./DayPicker";
import TimePicker from "./TimePicker";


export default function NewForm() {

  const router = useRouter();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [day, setDay ] = useState('Everyday');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const cron = convertToCron({ day, hour, minute });
    const result = await addReminder({ title, message, cron });
    setStatus(result.status);
    if (result.status === 'success') {
      router.push('/');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">New Reminder</legend>

        <label className="label">Title</label>
        <input type="text" name="title" className="input" onInput={(t) => setTitle(t.currentTarget.value)} placeholder="Feed the rabbit!" value={title} required />

        <label className="label">Message</label>
        <input type="text" name="message" className="input" onInput={(m) => setMessage(m.currentTarget.value)} placeholder="Don't forget to feed the rabbit!" value={message} required />

        <label className="label">Day</label>
        <DayPicker day={day} setDay={setDay} />

        <TimePicker hour={hour} minute={minute} setHour={setHour} setMinute={setMinute} />

        <button type="submit" className="btn btn-soft btn-primary mt-4">Add</button>

        {status === 'success' && <p className="flex items-center justify-center mt-2 text-green-500">Reminder added!</p>}
      </fieldset>
    </form>
  );
}
