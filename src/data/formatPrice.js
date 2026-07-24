const UNIT_LABELS = {
    mo: '/mo',
    article: '/article',
    project: '/project',
}

export const formatPrice = (pricing, region) => {
    const entry = pricing?.[region]
    if (!entry) return ''
    if (entry.isFree) return 'Free'

    const fmt = (n) => n.toLocaleString('en-US')
    const unitLabel = entry.unit ? UNIT_LABELS[entry.unit] || '' : ''

    if (entry.currency === 'USD') {
        const range = entry.min === entry.max
            ? `$${fmt(entry.min)}`
            : `$${fmt(entry.min)} – $${fmt(entry.max)}`
        return `${range}${unitLabel}`
    }

    // PKR and other currencies: single prefix, not repeated per number
    const range = entry.min === entry.max
        ? `${entry.currency} ${fmt(entry.min)}`
        : `${entry.currency} ${fmt(entry.min)} – ${fmt(entry.max)}`
    return `${range}${unitLabel}`
}