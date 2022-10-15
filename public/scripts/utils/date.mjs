export const dateFormatter = (date) => new Date(date).toLocaleDateString();
export const dateTimeFormatter = (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
};
