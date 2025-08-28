export const storage = {
    get: (k, d=null) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    remove: (k) => localStorage.removeItem(k),
  }
  