const hFormat = /[0-9]h/
const dFormat = /[0-9]d/

export const isInTimeAgo = (dateA: string, timeago: string): boolean => {
  if (dateA.match(hFormat) && timeago.match(dFormat)) return true
  if (dateA.match(dFormat) && timeago.match(hFormat)) return false
  if (dateA.match(hFormat) && timeago.match(hFormat)) {
    return Number(dateA.split('h')[0]) < Number(timeago.split('h')[0])
  }
  if (dateA.match(dFormat) && timeago.match(dFormat)) {
    return Number(dateA.split('d')[0]) < Number(timeago.split('d')[0])
  }

  return true
}
