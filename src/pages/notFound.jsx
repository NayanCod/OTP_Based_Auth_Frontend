import React from 'react'

const NotFound = () => {
  return (
        <div>
            <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="mt-4 text-lg text-slate-700">The page you are looking for does not exist.</p>
            <a href="/" className="mt-6 inline-block text-lg text-blue-600 hover:underline">Go to Home</a>
        </div>
  )
}

export default NotFound
