import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: call password reset endpoint
    setSent(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-white">
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Reset form */}
        <div className="px-6 sm:px-12 lg:px-20 xl:px-28 py-10 lg:py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-black mb-4">Reset your password</h1>
          <p className="text-black/80 mb-8">We will send you an email to reset your password.</p>

          <form onSubmit={onSubmit} className="max-w-xl space-y-6">
            {sent && (
              <div className="w-full rounded-md border border-green-400 bg-green-50 px-4 py-2 text-sm text-green-700">
                If an account exists for {email || "this email"}, you will receive a reset link shortly.
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm text-black">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/80"
              />
            </div>

            <button
              type="submit"
              className="w-[320px] max-w-full rounded-full bg-black px-6 py-3.5 text-white text-base font-medium hover:opacity-90 focus:outline-none"
            >
              Submit
            </button>

            <div>
              <button
                onClick={handleCancel}
                className="underline underline-offset-2 text-black"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Hero panel */}
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