
export default function RecurrenceSelector() {
  return (
    <select className="w-full p-2 border rounded mt-1">
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  );
}
