export default function MonthlyPatternPicker() {
  return (
    <div className="mt-1">
      <label className="block mb-1 font-medium">Monthly Pattern:</label>
      <div className="flex gap-2">
        <select className="p-2 border rounded">
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
          <option value="last">Last</option>
        </select>
        <select className="p-2 border rounded">
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>
    </div>
  );
}
