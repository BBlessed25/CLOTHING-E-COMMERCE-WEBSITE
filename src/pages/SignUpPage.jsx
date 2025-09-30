import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

export default function SignUpPage() {
  const navigate = useNavigate()
  const { api } = useApp()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    if (!firstName.trim()) {
      setError("First name is required")
      return false
    }
    if (!lastName.trim()) {
      setError("Last name is required")
      return false
    }
    if (!email.trim()) {
      setError("Email is required")
      return false
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      await api.register(firstName, lastName, email, password)
      
      setSuccess("Account created successfully! Redirecting to your account...")
      
      // Longer delay to ensure state is properly saved before navigation
      setTimeout(() => {
        console.log('Navigating to account page after signup')
        navigate("/account", { replace: true })
      }, 2000)
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-white">
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Create Account form */}
        <div className="px-6 sm:px-12 lg:px-20 xl:px-28 py-10 lg:py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-black mb-10">Create Account</h1>

          <form onSubmit={onSubmit} className="max-w-xl space-y-6">
            {/* Success Message */}
            {success && (
              <div className="w-full rounded-md border border-green-400 bg-green-100 px-4 py-2 text-sm text-green-600">
                {success}
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="w-full rounded-md border border-red-400 bg-red-100 px-4 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm text-black">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
                className={`w-full rounded-xl border px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black/80"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-black">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
                className={`w-full rounded-xl border px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black/80"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-black">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={`w-full rounded-xl border px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black/80"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-black">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={`w-full rounded-xl border px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black/80"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-black">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className={`w-full rounded-xl border px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black/80"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-[320px] max-w-full rounded-full bg-black px-6 py-3.5 text-white text-base font-medium hover:opacity-90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div>
              <Link to="/login" className="underline underline-offset-2 text-black">
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT: Hero image + caption */}
        <div className="relative min-h-[60vh] lg:min-h-[calc(100dvh-64px)] overflow-hidden">
          <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
          <div className="relative z-10 h-full w-full flex items-end justify-center px-6 pb-12 text-center">
            <div className="max-w-4xl">
              <h2 className="text-white text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
                Discover Exclusive Luxury
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Explore a curated collection of high-end fashion, rare accessories, and
                timeless craftsmanship
              </p>
            </div>
          </div>
          {/* Replace with your own image if desired */}
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "url('https://images.unsplash.com/photo-1511556670410-f3d95d9ae7dd?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat" }}
          />
        </div>
      </div>
    </div>
  )
}