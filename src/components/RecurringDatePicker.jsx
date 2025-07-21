// Enhanced RecurringDatePicker.jsx with Nth weekday and calendar preview
import React, { useState, useEffect } from "react";
import { format, addDays, addMonths, addWeeks, addYears, isBefore, isSameDay, parseISO } from "date-fns";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function RecurringDatePicker() {
  const [frequency, setFrequency] = useState("weekly");
  const [interval, setInterval] = useState(1);
  const [startDate, setStartDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [endType, setEndType] = useState("never");
  const [endDate, setEndDate] = useState("");
  const [occurrences, setOccurrences] = useState(10);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [nthWeek, setNthWeek] = useState(1);
  const [nthDay, setNthDay] = useState("Monday");
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generatedDates = generateRecurringDates();
    setDates(generatedDates);
  }, [frequency, interval, startDate, endType, endDate, occurrences, selectedWeekdays, nthWeek, nthDay]);

  function toggleWeekday(day) {
    setSelectedWeekdays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  }

  function generateRecurringDates() {
    let results = [];
    let current = parseISO(startDate);
    let count = 0;

    while (true) {
      if (endType === "after" && count >= occurrences) break;
      if (endType === "on" && isBefore(parseISO(endDate), current)) break;

      if (frequency === "weekly") {
        if (selectedWeekdays.includes(weekdays[current.getDay()])) {
          results.push(current);
          count++;
        }
        current = addDays(current, 1);
      } else if (frequency === "daily") {
        results.push(current);
        count++;
        current = addDays(current, interval);
      } else if (frequency === "monthly") {
        const nthDate = getNthWeekdayOfMonth(current, nthWeek, nthDay);
        if (nthDate && !results.find(d => isSameDay(d, nthDate))) {
          results.push(nthDate);
          count++;
        }
        current = addMonths(current, interval);
      } else if (frequency === "yearly") {
        results.push(current);
        count++;
        current = addYears(current, interval);
      } else {
        break;
      }
    }
    return results;
  }

  function getNthWeekdayOfMonth(date, nth, dayName) {
    const targetDay = weekdays.indexOf(dayName);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let count = 0;
    for (let i = 0; i < 31; i++) {
      let d = new Date(date.getFullYear(), date.getMonth(), i + 1);
      if (d.getMonth() !== date.getMonth()) break;
      if (d.getDay() === targetDay) {
        count++;
        if (count === nth) return d;
      }
    }
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Repeat</label>
          <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full border rounded p-2">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label>Every</label>
          <input type="number" min="1" value={interval} onChange={e => setInterval(parseInt(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div>
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border rounded p-2" />
      </div>

      {frequency === "weekly" && (
        <div className="flex flex-wrap gap-2">
          {weekdays.map(day => (
            <button
              key={day}
              onClick={() => toggleWeekday(day)}
              className={`px-3 py-1 border rounded-full ${selectedWeekdays.includes(day) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      )}

      {frequency === "monthly" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Week Number</label>
            <select value={nthWeek} onChange={e => setNthWeek(parseInt(e.target.value))} className="w-full border p-2 rounded">
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Third</option>
              <option value="4">Fourth</option>
              <option value="5">Fifth</option>
            </select>
          </div>
          <div>
            <label>Weekday</label>
            <select value={nthDay} onChange={e => setNthDay(e.target.value)} className="w-full border p-2 rounded">
              {weekdays.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>
        </div>
      )}

      <div>
        <label>Ends</label>
        <select value={endType} onChange={e => setEndType(e.target.value)} className="w-full border p-2 rounded">
          <option value="never">Never</option>
          <option value="after">After X Occurrences</option>
          <option value="on">On Date</option>
        </select>
      </div>

      {endType === "on" && (
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border p-2 rounded" />
      )}

      {endType === "after" && (
        <input type="number" min="1" value={occurrences} onChange={e => setOccurrences(parseInt(e.target.value))} className="w-full border p-2 rounded" />
      )}

      <div>
        <h3 className="text-lg font-semibold">Upcoming Dates</h3>
        <ul className="list-disc list-inside max-h-48 overflow-y-auto">
          {dates.slice(0, 20).map((date, i) => (
            <li key={i}>{format(date, "eee, MMM d, yyyy")}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
