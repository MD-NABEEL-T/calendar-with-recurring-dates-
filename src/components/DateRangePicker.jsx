export default function DateRangePicker() {
  return (
    <div className="flex gap-2 mt-1">
      <input
        type="date"
        className="p-2 border rounded w-full"
        placeholder="Start Date"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        className="p-2 border rounded w-full"
        placeholder="End Date"
      />
    </div>
  );
}
