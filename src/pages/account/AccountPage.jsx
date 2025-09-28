import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';

// Icons
function ChevronUp({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 0 1-1.06-.02L10 8.832 6.29 12.77a.75.75 0 1 1-1.08-1.04l4.25-4.39a.75.75 0 0 1 1.08 0l4.25 4.39a.75.75 0 0 1-.02 1.06z" clipRule="evenodd" />
    </svg>
  )
}

function ChevronDown({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" clipRule="evenodd" />
    </svg>
  )
}


function IconChat({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>
  )
}


// Sidebar Component
function Sidebar() {
  const [expandedSections, setExpandedSections] = useState({
    myAccount: true,
    orderInfo: true,
    wishlist: true,
    shopConfidently: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-black mb-6">My Account</h1>
      
      {/* My Account Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('myAccount')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
        >
          My Account
          {expandedSections.myAccount ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.myAccount && (
          <div className="ml-4 space-y-2">
            <Link to="/account" className="block py-2 px-3 bg-gray-100 rounded text-sm font-medium text-black">
              Account Details
            </Link>
            <Link to="/account/addresses" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              Addresses
            </Link>
            <Link to="/account/preferences" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              Contact Preferences
            </Link>
          </div>
        )}
      </div>

      {/* Order Information Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('orderInfo')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
        >
          Order Information
          {expandedSections.orderInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.orderInfo && (
          <div className="ml-4 space-y-2">
            <Link to="/account/orders" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              Order History
            </Link>
            <Link to="/account/returns" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              Start a Return
            </Link>
            <Link to="/account/return-policy" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              Returns Policy
            </Link>
          </div>
        )}
      </div>

      {/* Wishlist Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('wishlist')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
        >
          Wishlist
          {expandedSections.wishlist ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.wishlist && (
          <div className="ml-4 space-y-2">
            <Link to="/account/wishlist" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              My Wishlist
            </Link>
          </div>
        )}
      </div>

      {/* Shop Confidently Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('shopConfidently')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
        >
          Shop Confidently
          {expandedSections.shopConfidently ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.shopConfidently && (
          <div className="ml-4 space-y-2">
            <Link to="/privacy" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              Privacy Notice
            </Link>
            <Link to="/account/contact-preferences" className="block py-2 px-3 text-sm text-gray-700 hover:text-black">
              Contact Preferences
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}


export default function AccountPage() {
  const { state, api } = useApp()
  const navigate = useNavigate()
  const user = state.auth.user

  const handleLogout = () => {
    api.logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">Hi {user?.firstName || user?.name || 'User'},</h2>
              <p className="text-gray-600">Welcome back! Use these quick links to easily find what you need.</p>
            </div>
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-black hover:text-white"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>

          {/* Return an Item Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-black mb-3">Return an Item</h3>
            <p className="text-gray-600 mb-4">
              Need to return an item? Start your return easily following our{' '}
              <a href="#" className="underline">return policy</a>, and reach out to{' '}
              <a href="#" className="underline">support</a> if you need any help.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800">
              Start return
            </Button>
          </div>

          {/* Order History Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-black mb-3">Order History</h3>
            <p className="text-gray-600 mb-4">You have yet to make any order.</p>
            <div className="flex gap-3">
              <Button className="bg-black text-white hover:bg-gray-800">
                View History
              </Button>
              <Button 
                variant="outline" 
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/collections')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Account Details Section */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-6">Account Details</h3>
            <div className="bg-gray-50 rounded-lg p-6 max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={user?.firstName || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={user?.lastName || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  />
                </div>
              </div>
              <Button className="mt-6 bg-black text-white hover:bg-gray-800">
                Edit Details
              </Button>
            </div>
          </div>
        </main>
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
  