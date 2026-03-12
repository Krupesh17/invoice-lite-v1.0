// Always store timestamps in UTC for global compatibility
export function getTimestamp() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  const seconds = String(now.getUTCSeconds()).padStart(2, "0");
  const microseconds = String(now.getMilliseconds()).padEnd(6, "0");

  // Format: YYYY-MM-DD HH:mm:ss.microseconds+00 (UTC)
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}+00`;
}

// Convert UTC timestamp to local readable date/time
export function timestampToReadableDateTime(timestamp) {
  const date = new Date(timestamp);

  // Extract day, month, year (local)
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Extract hours and minutes (local)
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
}
