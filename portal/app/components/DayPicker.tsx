interface DayPickerProps {
  day: string;
  setDay: (day: string) => void;
}

export default function DayPicker({ day, setDay }: DayPickerProps) {
  const days = [
    "Everyday",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
    "Sundays",
  ];

  return (
    <select value={day} onChange={(v) => setDay(v.currentTarget.value)} className="select">
      {days.map((day) => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
  );
}
