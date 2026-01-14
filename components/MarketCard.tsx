'use client'

import { Link2, Bookmark, Calendar } from 'lucide-react'

interface Outcome {
  name: string
  probability: number
}

interface MarketCardProps {
  title: string
  image: string
  outcomes: Outcome[]
  volume: string
  endDate: string
  comments?: number
  type?: 'binary' | 'multi'
}

export function MarketCard({ title, image, outcomes, volume, endDate, comments = 0, type = 'multi' }: MarketCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Link2 className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Bookmark className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Outcomes */}
      <div className="space-y-2 mb-4">
        {outcomes.slice(0, 3).map((outcome, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="flex-1 text-sm text-gray-600 truncate">{outcome.name}</span>
            <span className="text-sm font-medium text-gray-900 w-12 text-right">{outcome.probability}%</span>
            <button className="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              YES
            </button>
            <button className="px-3 py-1 rounded-md text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
              NO
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-orange-400"></div>
            <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
            <div className="w-5 h-5 rounded-full bg-green-400"></div>
          </div>
          <span className="text-xs text-gray-500">+{comments}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            {volume}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {endDate}
          </span>
        </div>
      </div>
    </div>
  )
}
