'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">predict</span>
              <span className="text-xs text-gray-500 ml-1 -mt-2">beta</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/markets" className="text-gray-600 hover:text-gray-900 font-medium">
                Markets
              </Link>
              <Link href="#" className="px-3 py-1 bg-yellow-400 rounded-full text-sm font-semibold text-gray-900">
                Points
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Invite
              </Link>
            </div>
          </div>

          {/* Search & Auth */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search markets..."
                className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-32"
              />
              <kbd className="text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                Shift + /
              </kbd>
            </div>

            <button className="text-gray-600 hover:text-gray-900 font-medium">
              Log In
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
