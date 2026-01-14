'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="relative z-50 mx-auto max-w-screen-xl border-b border-black/5 bg-white">
      <div className="flex h-14 items-center justify-between gap-8 px-4">
        {/* Left side - Logo and Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">predict</span>
            <span className="ml-1 -mt-3 rounded bg-gray-200 px-1 py-0.5 text-[10px] font-medium text-gray-600">
              beta
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/markets"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Markets
            </Link>
            <Link
              href="#"
              className="points-badge"
            >
              Points
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Invite
            </Link>
          </div>
        </div>

        {/* Right side - Search and Auth */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search markets..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-28"
            />
            <kbd className="text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono">
              Shift + /
            </kbd>
          </div>

          {/* Auth Buttons */}
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Log In
          </button>
          <button className="btn-primary text-sm">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}
