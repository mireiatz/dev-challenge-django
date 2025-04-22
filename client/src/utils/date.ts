// Get a future date in the format of "dd Month Year"
export const getFutureDate = (yearsFromNow: number): string => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setFullYear(today.getFullYear() + yearsFromNow);

    return futureDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}