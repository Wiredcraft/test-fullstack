/**
 * Get gap time
 * @param {string} from
 */
export function getTimeGapInfo(from) {
  const gap = new Date().getTime() - new Date(from).getTime()
  if (gap / 1000 / 60 < 60) {
    const info = Math.floor(gap / 1000 / 60)
    return info > 1 ? `${info} minutes ago` : '1 minute ago'
  } else if (gap / 1000 / 60 / 60 < 24) {
    const info = Math.floor(gap / 1000 / 60 / 60)
    return info > 1 ? `${info} hours ago` : '1 hour ago'
  } else if (gap / 1000 / 60 / 60 >= 24) {
    const info = Math.floor(gap / 1000 / 60 / 60 / 24)
    return info > 1 ? `${info} days ago` : '1 day ago'
  }
}
