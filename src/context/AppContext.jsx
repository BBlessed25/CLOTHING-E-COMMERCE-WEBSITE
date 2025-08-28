import { createContext, useContext, useMemo, useReducer } from 'react'

const AppContext = createContext(null)

const initial = {
  auth: { user: null, token: null, status: 'idle' },
  cart: { items: [], subtotal: 0, currency: 'NGN', status: 'idle' },
  ui: { drawer: { cart: false, quickBuy: false }, toasts: [] },
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, auth: { ...state.auth, user: action.user, token: action.token, status: 'auth' } }
    case 'LOGOUT':
      return { ...state, auth: { user: null, token: null, status: 'idle' } }
    case 'ADD_TO_CART': {
      const items = [...state.cart.items, action.item]
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
      return { ...state, cart: { ...state.cart, items, subtotal } }
    }
    case 'TOGGLE_CART':
      return { ...state, ui: { ...state.ui, drawer: { ...state.ui.drawer, cart: !state.ui.drawer.cart } } }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  const api = {
    login: async (email, password) => {
      // TODO: wire up to real API
      dispatch({ type: 'LOGIN_SUCCESS', user: { id: '1', name: 'Demo', email }, token: 'demo' })
    },
    logout: () => dispatch({ type: 'LOGOUT' }),
    addToCart: (item) => dispatch({ type: 'ADD_TO_CART', item }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
  }

  const value = useMemo(() => ({ state, dispatch, api }), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
