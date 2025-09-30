import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState } from 'react'
import Button from '../components/ui/Button'

// Icon components
const IconChat = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconMinus = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
  </svg>
)

const IconPlus = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
  </svg>
)

export default function CartPage() {
  const { state, api } = useApp()
  const items = state.cart.items
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({})
  
  console.log('CartPage - Cart state:', state.cart)
  console.log('CartPage - Items:', items)

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * (quantities[item.id] || item.qty)), 0)

  // Update quantity for an item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item from cart
      api.removeFromCart?.(itemId)
      return
    }
    setQuantities(prev => ({ ...prev, [itemId]: newQuantity }))
  }

  // Remove item from cart
  const removeItem = (itemId) => {
    api.removeFromCart?.(itemId)
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className="min-h-[calc(100dvh-64px)] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="text-4xl md:text-[40px] font-semibold tracking-tight text-black mb-4">
            Your cart is empty
          </h1>
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-black/70 mb-8">There are no items in your cart</p>
          <button
            onClick={() => navigate('/collections')}
            className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-base font-medium hover:bg-black hover:text-white transition"
          >
            Continue shopping
          </button>
        </div>
      </div>
    )
  }

  // Mock "Customers also bought" products
  const recommendedProducts = [
    {
      id: 'rec-1',
      name: 'Arte Eye Sleeve Longsleeve White',
      price: 167200,
      image: '/assets/crop.jpg',
      brand: 'ARTE'
    },
    {
      id: 'rec-2', 
      name: 'Arte Low Cargo Pants Green',
      price: 319200,
      image: '/assets/sing.jpg',
      brand: 'ARTE'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold tracking-tight text-black mb-2">Your cart</h1>
            <div className="border-b border-gray-200 pb-2 mb-6">
              <p className="text-sm text-gray-600">{items.length} item{items.length > 1 ? 's' : ''}</p>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => {
                const currentQuantity = quantities[item.id] || item.qty
                return (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = ''
                          e.currentTarget.style.background = '#eee'
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-black text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                          <p className="text-xs text-gray-500">{item.size}</p>
                          <span className="inline-block mt-1 text-xs text-orange-600 font-medium">
                            Only 1 left!
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">₦{item.price.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, currentQuantity - 1)}
                            className="p-2 hover:bg-gray-50"
                          >
                            <IconMinus />
                          </button>
                          <span className="px-3 py-2 text-sm font-medium">{currentQuantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, currentQuantity + 1)}
                            className="p-2 hover:bg-gray-50"
                          >
                            <IconPlus />
                          </button>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="text-xs text-gray-600 hover:text-black underline">
                            Edit Details
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-gray-600 hover:text-black underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Customers Also Bought Section */}
            <div className="mt-12">
              <h2 className="text-lg font-semibold text-black mb-6">Customers also bought</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = ''
                          e.currentTarget.style.background = '#eee'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-black text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                      <p className="font-semibold text-black text-sm mt-2">₦{product.price.toLocaleString()}</p>
                      <Button 
                        className="mt-2 text-xs px-3 py-1 bg-black text-white hover:bg-gray-800"
                        onClick={() => {
                          const cartItem = {
                            id: product.id,
                            name: product.name,
                            brand: product.brand,
                            price: product.price,
                            image: product.image,
                            size: 'One Size',
                            qty: 1
                          }
                          api.addToCart(cartItem)
                        }}
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <button className="text-sm text-gray-600 hover:text-black underline">
                    + Add order notes
                  </button>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-black mb-2">Subtotal</h3>
                  <p className="text-2xl font-bold text-black">₦{subtotal.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>

                <Button 
                  className="w-full mt-6 bg-black text-white hover:bg-gray-800"
                  onClick={() => navigate('/checkout')}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="relative bg-black text-white rounded-full p-4 hover:bg-gray-800">
          <IconChat className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold">
            1
          </span>
        </button>
      </div>
    </div>
  )
}