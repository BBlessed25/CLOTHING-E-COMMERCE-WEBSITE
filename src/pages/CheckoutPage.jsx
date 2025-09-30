import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Button from '../components/ui/Button'

// Icon components
const IconTruck = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 3h15v13H1z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

const IconStore = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="9,22 9,12 15,12 15,22" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconSearch = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
)

const IconQuestion = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
)

const IconInfo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
)

export default function CheckoutPage() {
  const { state } = useApp()
  const items = state.cart.items
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    newsOffers: false,
    deliveryMethod: 'ship',
    country: 'United States',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Florida',
    zipCode: '',
    phone: '',
    saveInfo: false,
    discountCode: '',
    paymentMethod: 'flutterwave',
    billingAddress: 'same'
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.qty), 0)
  }

  const subtotal = calculateSubtotal()

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[calc(100dvh-64px)] bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart to proceed with checkout</p>
          <Button onClick={() => window.history.back()}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold tracking-tight text-black mb-8">Checkout</h1>
            
            {/* Step 1: Contact & Delivery */}
            {currentStep === 1 && (
              <div className="space-y-8">
                {/* Contact Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-black">Contact</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                      Sign in
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newsOffers"
                        checked={formData.newsOffers}
                        onChange={(e) => handleInputChange('newsOffers', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="newsOffers" className="text-sm text-gray-700">
                        Email me with news and offers
                      </label>
                    </div>
                  </div>
                </div>

                {/* Delivery Section */}
                <div>
                  <h2 className="text-xl font-semibold text-black mb-4">Delivery</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="ship"
                          checked={formData.deliveryMethod === 'ship'}
                          onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                          className="mr-2"
                        />
                        <div className="flex items-center">
                          <IconTruck className="mr-2" />
                          <span>Ship</span>
                        </div>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={formData.deliveryMethod === 'pickup'}
                          onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                          className="mr-2"
                        />
                        <div className="flex items-center">
                          <IconStore className="mr-2" />
                          <span>Pick up</span>
                        </div>
                      </label>
                    </div>

                    {/* Shipping Address Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="United States">United States</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter your address"
                          />
                          <IconSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          value={formData.apartment}
                          onChange={(e) => handleInputChange('apartment', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <select
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          >
                            <option value="Florida">Florida</option>
                            <option value="California">California</option>
                            <option value="New York">New York</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP code</label>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                          <IconQuestion className="inline ml-1 text-gray-400" />
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveInfo"
                          checked={formData.saveInfo}
                          onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="saveInfo" className="text-sm text-gray-700">
                          Save this information for next time
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Shipping Method Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Shipping Method:</strong> Please ensure your selected state matches your delivery address. 
                    If there's a mismatch, you may be liable for any additional shipping charges.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your shipping address to view available shipping methods
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your shipping address"
                  />
                </div>

                {/* Payment Section */}
                <div>
                  <h2 className="text-xl font-semibold text-black mb-2">Payment</h2>
                  <p className="text-sm text-gray-600 mb-6">All transactions are secure and encrypted.</p>
                  
                  <div className="space-y-4">
                    {/* Paystack */}
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paystack"
                        checked={formData.paymentMethod === 'paystack'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">Paystack</span>
                          <div className="flex items-center ml-4 space-x-2">
                            <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">M</div>
                            <div className="w-6 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center">V</div>
                            <div className="w-6 h-4 bg-green-600 rounded text-white text-xs flex items-center justify-center">V</div>
                            <span className="text-sm text-gray-500">+5</span>
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Flutterwave */}
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="flutterwave"
                        checked={formData.paymentMethod === 'flutterwave'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">Flutterwave</span>
                          <div className="flex items-center ml-4 space-x-2">
                            <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">V</div>
                            <div className="w-6 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center">M</div>
                            <div className="w-6 h-4 bg-green-600 rounded text-white text-xs flex items-center justify-center">V</div>
                            <span className="text-sm text-gray-500">+5</span>
                          </div>
                        </div>
                        <div className="mt-2 ml-6">
                          <div className="w-32 h-20 border border-gray-300 rounded bg-gray-50 flex items-center justify-center mb-2">
                            <div className="w-24 h-12 border border-gray-400 rounded bg-white flex items-center justify-center">
                              <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center">
                                <div className="w-12 h-4 bg-gray-300 rounded"></div>
                              </div>
                            </div>
                            <div className="absolute ml-16">
                              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            After clicking "Pay now", you will be redirected to Flutterwave to complete your purchase securely.
                          </p>
                        </div>
                      </div>
                    </label>

                    {/* Bank Transfer */}
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bankTransfer"
                        checked={formData.paymentMethod === 'bankTransfer'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3"
                      />
                      <span className="font-medium">Bank Transfer</span>
                    </label>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Billing address</h3>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="billingAddress"
                        value="same"
                        checked={formData.billingAddress === 'same'}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        className="mr-3"
                      />
                      <span>Same as shipping address</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="billingAddress"
                        value="different"
                        checked={formData.billingAddress === 'different'}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        className="mr-3"
                      />
                      <span>Use a different billing address</span>
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStep(3)}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Pay now
                </Button>

                {/* Footer Links */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <button className="hover:text-black underline">Refund policy</button>
                  <button className="hover:text-black underline">Shipping</button>
                  <button className="hover:text-black underline">Privacy policy</button>
                  <button className="hover:text-black underline">Terms of service</button>
                  <button className="hover:text-black underline">Contact</button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-black mb-4">Order Complete!</h2>
                <p className="text-gray-600 mb-8">Thank you for your purchase. You will receive a confirmation email shortly.</p>
                <Button onClick={() => window.location.href = '/'}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="border border-gray-200 rounded-lg p-6">
                {/* Product Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = ''
                            e.currentTarget.style.background = '#eee'
                          }}
                        />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                          {item.qty}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-black text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        <p className="text-xs text-gray-500">{item.size}</p>
                        <p className="font-semibold text-black text-sm mt-1">₦{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.discountCode}
                      onChange={(e) => handleInputChange('discountCode', e.target.value)}
                      placeholder="Discount code or gift card"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                    <Button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      Shipping
                      <IconInfo className="ml-1 text-gray-400" />
                    </span>
                    <span className="text-gray-500">Enter shipping address</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span>NGN ₦{subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}