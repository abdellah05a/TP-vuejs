export const salaryLabel = value => new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(value)
export const dateLabel = value => new Intl.DateTimeFormat('fr-FR').format(new Date(value + 'T00:00:00'))
