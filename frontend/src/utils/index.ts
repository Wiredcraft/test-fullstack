import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function formatTime(date: Date) {
  return dayjs(date).fromNow()
}