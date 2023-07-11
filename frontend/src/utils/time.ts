export const calculateTimeToRead = (text: string) => {
  const wpm = 60;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  return time;
};
