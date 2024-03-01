export function formateDateToHoursMinutesAndSeconds(dateMilliseconds: number) {
  const hours = Math.floor(dateMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((dateMilliseconds / (1000 * 60)) % 60);
  const seconds = Math.floor((dateMilliseconds / 1000) % 60);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

  const formatedHours = formatNumber(hours);
  const formatedMinutes = formatNumber(minutes);
  const formatedSeconds = formatNumber(seconds);

  return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
}

export function formatDateBetweenDates(
  initDate: Date,
  endDate: Date = new Date(),
) {
  const difference = endDate.getTime() - initDate.getTime();

  const formatedDate = formateDateToHoursMinutesAndSeconds(difference);

  return formatedDate;
}
