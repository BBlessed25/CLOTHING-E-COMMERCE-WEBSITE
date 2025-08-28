export function required(v) { return v ? null : 'This field is required' }
export function email(v) { return /.+@.+\..+/.test(v) ? null : 'Enter a valid email' }
export function min(n) { return (v) => (v && v.length >= n ? null : `Must be at least ${n} characters`) }
