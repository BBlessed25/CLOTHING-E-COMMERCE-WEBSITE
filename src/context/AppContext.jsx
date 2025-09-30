import { createContext, useContext, useMemo, useReducer, useEffect } from 'react'

const AppContext = createContext(null)

// Default initial state
const defaultInitialState = {
  auth: { user: null, token: null, status: 'idle' },
  cart: { items: [], subtotal: 0, currency: 'NGN', status: 'idle' },
  ui: { drawer: { cart: false, quickBuy: false }, toasts: [] },
  users: [] // Store registered users
}

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
    case 'RESTORE_USERS':
      return { ...state, users: action.users }
    case 'ADD_TO_CART': {
      const items = [...state.cart.items, action.item]
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
      return { ...state, cart: { ...state.cart, items, subtotal } }
    }
    case 'REMOVE_FROM_CART': {
      const items = state.cart.items.filter(item => item.id !== action.itemId)
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
  const [state, dispatch] = useReducer(reducer, defaultInitialState)

  // Handle initial state loading on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('finch_auth')
    const savedUsers = localStorage.getItem('finch_users')
    
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        console.log('Restoring auth state on mount:', authData)
        dispatch({ type: 'LOGIN_SUCCESS', user: authData.user, token: authData.token })
      } catch (error) {
        console.error('Error restoring auth state:', error)
      }
    }
    
    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers)
        console.log('Restoring users on mount:', users)
        // Dispatch action to restore users
        dispatch({ type: 'RESTORE_USERS', users })
      } catch (error) {
        console.error('Error restoring users:', error)
      }
    }
  }, [])

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (state.auth.status === 'auth' && state.auth.user) {
      const authData = {
        user: state.auth.user,
        token: state.auth.token
      }
      localStorage.setItem('finch_auth', JSON.stringify(authData))
      console.log('Auth state saved to localStorage:', authData)
    }
    // Only remove from localStorage on explicit logout, not on idle status
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
      console.log('Registering user:', userData)
      dispatch({ type: 'REGISTER_SUCCESS', user: userData, token: 'demo-token' })
    },
    logout: () => {
      localStorage.removeItem('finch_auth')
      dispatch({ type: 'LOGOUT' })
    },
    addToCart: (item) => dispatch({ type: 'ADD_TO_CART', item }),
    removeFromCart: (itemId) => dispatch({ type: 'REMOVE_FROM_CART', itemId }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
  }

  const value = useMemo(() => ({ state, dispatch, api }), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
