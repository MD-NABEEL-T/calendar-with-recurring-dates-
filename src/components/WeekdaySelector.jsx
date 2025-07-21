const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeekdaySelector() {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {days.map((day) => (
        <label key={day} className="flex items-center gap-1">
          <input type="checkbox" value={day} />
          <span>{day}</span>
        </label>
      ))}
    </div>
  );
}
