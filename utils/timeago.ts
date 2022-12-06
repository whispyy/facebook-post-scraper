const minFormat = /[0-9]{1,2}[ ]?min/
const hFormat = /[0-9]h/
const dFormat = /[0-9]d/

// dateA can match min, hours and day format
// timeAgo can match hours and day format (not min)
export const isInTimeAgo = (dateA: string, timeago: string): boolean => {
  if (!timeago.length) return true
  if (dateA.match(minFormat)) return true
  if (dateA.match(hFormat) && timeago.match(dFormat)) return true
  if (dateA.match(dFormat) && timeago.match(hFormat)) return false
  if (dateA.match(hFormat) && timeago.match(hFormat)) {
    return Number(dateA.split('h')[0]) < Number(timeago.split('h')[0])
  }
  if (dateA.match(dFormat) && timeago.match(dFormat)) {
    return Number(dateA.split('d')[0]) < Number(timeago.split('d')[0])
  }

  return false
}
