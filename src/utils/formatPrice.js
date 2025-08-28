export function formatPrice(value, currency = 'NGN') {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value)
    } catch {
      return `${value} ${currency}`
    }
  }
  