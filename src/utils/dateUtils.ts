import { formatDistanceToNow as fDistance, format } from 'date-fns';

export function formatDistanceToNow(date: Date): string {
  return fDistance(date, { addSuffix: true });
}

export function formatDateTime(date: Date): string {
  return format(date, 'MMM d, yyyy h:mm a');
}