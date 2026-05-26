'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reminder, updateReminder } from '@/app/utils/reminders';

export default function EditForm({ reminder }: { reminder: Reminder }) {

  const router = useRouter();
  const [title, setTitle] = useState(reminder.title);
  const [message, setMessage] = useState(reminder.message);
  const [cron, setCron] = useState(reminder.cron);
  const [status, setStatus] = useState('');

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await updateReminder({ ...reminder, title, message, cron });
    setStatus(result.status);
    if (result.status === 'success') {
      router.push('/');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit Reminder</legend>

        <label className="label">Title</label>
        <input type="text" name="title" className="input" onInput={(t) => setTitle(t.currentTarget.value)} placeholder="Feed the rabbit!" value={title} required />

        <label className="label">Message</label>
        <input type="text" name="message" className="input" onInput={(m) => setMessage(m.currentTarget.value)} placeholder="Don't forget to feed the rabbit!" value={message} required />

        <label className="label">Cron</label>
        <input type="text" name="cron" className="input" onInput={(c) => setCron(c.currentTarget.value)} placeholder="0 17 * * *" value={cron} required pattern="(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|(((\*\/\d+|\d+(\/|-)\d+|(\d+,)+\d+|\d+|\*) ?){5,7})" title="Enter a valid cron expression (e.g. 0 17 * * *)" />

        <button type="submit" className="btn btn-soft btn-primary mt-4">Update</button>

        {status === 'success' && <p className="flex items-center justify-center mt-2 text-green-500">Reminder updated!</p>}
      </fieldset>
    </form>
  );
}
