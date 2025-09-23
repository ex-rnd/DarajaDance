
export function getTimestamp() {
    const dateString = new Date().toLocaleString('en-US', {
        timeZone: "Africa/Nairobi",
    });

    const date = new Date(dateString);

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`

    return timestamp;

}