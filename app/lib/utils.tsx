export const formatDate = (date: Date) => {
  return date
    .toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "")
}

export const validateStrAsPureNum = (str: string) => {
  if (!/^\d+$/.test(str)) return false
  return true
}
