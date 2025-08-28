import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    // Mock auth check (replace with real API later)
    if (email !== "demo@example.com" || password !== "password123") {
      setError("Incorrect email or password.")
      return
    }

    setError("")
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-white">
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Sign In form */}
        <div className="px-6 sm:px-12 lg:px-20 xl:px-28 py-10 lg:py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-black mb-10">Sign In</h1>

          <form onSubmit={onSubmit} className="max-w-xl space-y-6">
            {/* Error Message */}
            {error && (
              <div className="w-full rounded-md border border-red-400 bg-red-100 px-4 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm text-black">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                className={`w-full rounded-xl border px-4 py-3 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 ${
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
                placeholder="********"
                required
                className={`w-full rounded-xl border px-4 py-3 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black/80"
                }`}
              />
            </div>

            <div className="pt-2">
              <Link to="/forgot-password" className="text-sm underline underline-offset-2 text-black">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-[320px] max-w-full rounded-full bg-black px-6 py-3.5 text-white text-base font-medium hover:opacity-90 focus:outline-none"
            >
              Sign In
            </button>

            <div className="pt-2">
              <Link to="/register" className="text-sm underline underline-offset-2 text-black">
                Dont have an account? Create account
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT: Hero message panel */}
        <div className="relative min-h-[60vh] lg:min-h-[calc(100dvh-64px)] overflow-hidden">
          <div className="absolute inset-0 bg-black" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(1200px 600px at 70% 30%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(800px 400px at 40% 70%, rgba(255,255,255,0.04), transparent 60%)",
            }}
          />
          <div className="relative z-10 h-full w-full flex items-center justify-center px-6 text-center">
            <div className="max-w-3xl">
              <h2 className="text-white text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
                Discover Exclusive Luxury
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Explore a curated collection of high-end fashion, rare accessories, and
                timeless craftsmanship
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}