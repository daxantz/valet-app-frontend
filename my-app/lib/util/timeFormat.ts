import dayjs from "dayjs";

export default function getShortElapsed(createdAt: string) {
  const now = dayjs();
  const created = dayjs(createdAt);
  const diffInSeconds = now.diff(created, "second");

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  const diffInMinutes = now.diff(created, "minute");
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = now.diff(created, "hour");
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = now.diff(created, "day");
  if (diffInDays < 7) return `${diffInDays}d`;
  const diffInWeeks = now.diff(created, "week");
  return `${diffInWeeks}w`;
}
