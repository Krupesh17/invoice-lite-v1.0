export function sortBy(data = [], property, order = "desc", type = "auto") {
  if (!Array.isArray(data)) {
    throw new TypeError("Expected 'data' to be an array");
  }
  if (!property) {
    throw new Error("Property to sort by must be provided");
  }
  if (!["asc", "desc"].includes(order)) {
    throw new Error("Order must be 'asc' or 'desc'");
  }

  const sorted = [...data]; // clone to avoid mutation

  return sorted.sort((a, b) => {
    let valA = a?.[property];
    let valB = b?.[property];

    // Auto type detection or explicit type
    if (type === "date" || property.endsWith("At")) {
      valA = valA ? new Date(valA).getTime() : 0;
      valB = valB ? new Date(valB).getTime() : 0;
    } else if (type === "number") {
      valA = Number(valA) || 0;
      valB = Number(valB) || 0;
    } else if (type === "string") {
      valA = valA?.toString().toLowerCase() || "";
      valB = valB?.toString().toLowerCase() || "";
    }

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
}
