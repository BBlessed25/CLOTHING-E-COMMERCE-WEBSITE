import { createContext, useContext, useMemo, useReducer, useEffect } from 'react'

const AppContext = createContext(null)

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const savedAuth = localStorage.getItem('finch_auth')
    const savedUsers = localStorage.getItem('finch_users')
    
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      return {
        auth: { ...authData, status: 'auth' },
        cart: { items: [], subtotal: 0, currency: 'NGN', status: 'idle' },
        ui: { drawer: { cart: false, quickBuy: false }, toasts: [] },
        users: savedUsers ? JSON.parse(savedUsers) : []
      }
    }
  } catch (error) {
    console.error('Error loading saved auth state:', error)
  }
  
  return {
    auth: { user: null, token: null, status: 'idle' },
    cart: { items: [], subtotal: 0, currency: 'NGN', status: 'idle' },
    ui: { drawer: { cart: false, quickBuy: false }, toasts: [] },
    users: [] // Store registered users
  }
}

const initial = loadInitialState()

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, auth: { ...state.auth, user: action.user, token: action.token, status: 'auth' } }
    case 'LOGOUT':
      return { ...state, auth: { user: null, token: null, status: 'idle' } }
    case 'REGISTER_SUCCESS':
      return { 
        ...state, 
        users: [...state.users, action.user],
        auth: { ...state.auth, user: action.user, token: action.token, status: 'auth' }
      }
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

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (state.auth.status === 'auth' && state.auth.user) {
      localStorage.setItem('finch_auth', JSON.stringify({
        user: state.auth.user,
        token: state.auth.token
      }))
    } else if (state.auth.status === 'idle') {
      localStorage.removeItem('finch_auth')
    }
  }, [state.auth])

  // Save users to localStorage whenever it changes
  useEffect(() => {
    if (state.users.length > 0) {
      localStorage.setItem('finch_users', JSON.stringify(state.users))
    }
  }, [state.users])

  const api = {
    login: async (email, password) => {
      // Check against registered users first
      const registeredUser = state.users.find(u => u.email === email && u.password === password)
      
      if (registeredUser) {
        const { password: _, ...userData } = registeredUser
        dispatch({ type: 'LOGIN_SUCCESS', user: userData, token: 'demo-token' })
        return
      }
      
      // Allow login with any email and password for demo purposes
      // Extract name from email (part before @)
      const emailName = email.split('@')[0]
      const firstName = emailName.charAt(0).toUpperCase() + emailName.slice(1)
      
      const userData = {
        id: Date.now().toString(),
        firstName: firstName,
        lastName: 'User',
        name: `${firstName} User`,
        email: email,
        createdAt: new Date().toISOString()
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', user: userData, token: 'demo-token' })
    },
    register: async (firstName, lastName, email, password) => {
      // Check if user already exists
      const existingUser = state.users.find(u => u.email === email)
      if (existingUser) {
        throw new Error('User with this email already exists')
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(), // Simple ID generation
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      }
      
      // Remove password from user object before storing in auth
      const { password: _, ...userData } = newUser
      dispatch({ type: 'REGISTER_SUCCESS', user: userData, token: 'demo-token' })
    },
    logout: () => {
      localStorage.removeItem('finch_auth')
      dispatch({ type: 'LOGOUT' })
    },
    addToCart: (item) => dispatch({ type: 'ADD_TO_CART', item }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
  }

  const value = useMemo(() => ({ state, dispatch, api }), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
