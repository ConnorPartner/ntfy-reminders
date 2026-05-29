interface TimePickerProps {
  hour: string;
  minute: string;
  setHour: (hour: string) => void;
  setMinute: (minute: string) => void;
}

export default function TimePicker({ hour, minute, setHour, setMinute }: TimePickerProps) {
  return (
    <div className="flex gap-2">
    <select value={hour} className="select" onChange={(v) => setHour(v.currentTarget.value)}>
        {[...Array(24)].map((_, i) => (
          <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
        ))}
      </select>
      <select value={minute} className="select" onChange={(v) => setMinute(v.currentTarget.value)}>
        {[...Array(60)].map((_, i) => (
          <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
        ))}
      </select>
      </div>
  );
}
