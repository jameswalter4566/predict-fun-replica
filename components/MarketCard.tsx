'use client'

import { Link2, Bookmark, Calendar, TrendingUp } from 'lucide-react'

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
}

export function MarketCard({ title, image, outcomes, volume, endDate, comments = 0 }: MarketCardProps) {
  return (
    <div className="market-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
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
          <div key={index} className="outcome-row">
            <span className="flex-1 text-sm text-gray-700 truncate">{outcome.name}</span>
            <span className="text-sm font-semibold text-gray-900 w-12 text-right">{outcome.probability}%</span>
            <button className="btn-yes text-xs px-2.5 py-1">
              YES
            </button>
            <button className="btn-no text-xs px-2.5 py-1">
              NO
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-orange-400 border-2 border-white"></div>
            <div className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-white"></div>
            <div className="w-5 h-5 rounded-full bg-green-400 border-2 border-white"></div>
          </div>
          <span className="text-xs text-gray-500">+{comments}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
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
