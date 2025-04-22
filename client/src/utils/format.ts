// Format a numeric value as a currency string
export const formatCurrency = (value: string | number | undefined | null): string => {
    if (value === undefined || value === null) {
        return '£0'
    }
    
    const num = typeof value === 'string' ? parseFloat(value) : value
    
    if (isNaN(num)) {
        return '£0'
    }
    
    if (num >= 1000000) {
        const millions = num / 1000000
        return `£${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`
    } else if (num >= 1000) {
        const thousands = num / 1000
        return `£${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`
    }
    return `£${num % 1 === 0 ? num.toFixed(0) : num.toFixed(2)}`
}

// Format a numeric value based on the unit and its position
export const formatValue = (value: number, unit?: string, unitPosition: number = 1): string => {
    if (unit === '£') {
        return formatCurrency(value)
    }
    return unitPosition === 0 ? `${unit}${value}` : `${value}${unit}`
} 