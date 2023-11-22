export function getTimeAgo(time: string) {
  const currentTime = new Date();
  const givenTime = new Date(time);

  const timeDifference = currentTime.getTime() - givenTime.getTime();

  // Convert time difference into appropriate units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  // Format the time difference into a "time ago" string
  if (years > 0) {
    return `${years}y`;
  } else if (months > 0) {
    return `${months}m`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

export function generateRandomDateWithinTwoWeeks() {
  const currentDate = new Date();
  const twoWeeksInMilliseconds = 14 * 24 * 60 * 60 * 1000;
  const randomTime = Math.random() * twoWeeksInMilliseconds;
  const randomDate = new Date(currentDate.getTime() - randomTime);
  return randomDate.toISOString();
}
