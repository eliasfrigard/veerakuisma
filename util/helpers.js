export function formatDate(dateString, format) {
  const date = new Date(dateString)

  switch (format) {
    case 'D MMM':
      return date
        .toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
        .toUpperCase()
    case 'D MMMM':
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
    case 'D MMMM YYYY':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    case 'YYYY':
      return date.getFullYear().toString()
    case 'HH:mm':
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    default:
      return date.toLocaleDateString('en-US')
  }
}

export function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/,
  )
  return match ? match[1] : null
}
