export const dateFormatter = (date: Date | string) =>
  new Date(date).toLocaleDateString();

export const dateTimeFormatter = (date: Date | string) => {
  const formattedDate = new Date(date);

  return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
};
