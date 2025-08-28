export default function Toast({ message, type='info' }) {
    const color = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-gray-900'
    return <div className={`${color} text-white px-3 py-2 rounded-lg shadow`}>{message}</div>
  }
  