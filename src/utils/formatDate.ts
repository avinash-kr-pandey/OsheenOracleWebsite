export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    // Example implementation using Intl.DateTimeFormat
    // For custom formats, you may use a library like date-fns or dayjs
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    }
    // Add more formats as needed
    return date.toISOString();
}