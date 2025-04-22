export const formatCurrency = (value: string | number | undefined | null): string => {
    if (value === undefined || value === null) {
        return '£0'
    }
    
    const num = typeof value === 'string' ? parseFloat(value) : value
    
    if (isNaN(num)) {
        return '£0'
    }
    
    if (num >= 1000000) {
        return `£${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
        return `£${(num / 1000).toFixed(1)}K`
    }
    return `£${num.toFixed(2)}`
} 