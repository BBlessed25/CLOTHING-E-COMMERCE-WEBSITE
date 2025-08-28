import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: call sign up API
    navigate("/login")
  }

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-white">
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Create Account form */}
        <div className="px-6 sm:px-12 lg:px-20 xl:px-28 py-10 lg:py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-black mb-10">Create Account</h1>

          <form onSubmit={onSubmit} className="max-w-xl space-y-6">
            <div className="space-y-2">
              <label className="block text-sm text-black">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/80"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/80"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/80"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/80"
              />
            </div>

            <button
              type="submit"
              className="w-[320px] max-w-full rounded-full bg-black px-6 py-3.5 text-white text-base font-medium hover:opacity-90 focus:outline-none"
            >
              Create Account
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