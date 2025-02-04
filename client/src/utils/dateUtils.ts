export const formatTime = (timestamp: number): string => {
  if (!Number.isFinite(timestamp)) return 'Invalid Time'

  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}
