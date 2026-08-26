export function toggleSelection(current: string[], item: string) {
  return current.includes(item) ? current.filter((value) => value !== item) : [...current, item];
}

export function addUniqueToSelection(current: string[], item: string) {
  return current.includes(item) ? current : [...current, item];
}
