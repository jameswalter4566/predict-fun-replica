'use client'

import { Navbar } from '@/components/Navbar'
import { MarketCard } from '@/components/MarketCard'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'

const CATEGORIES = ['All', 'Politics', 'Crypto', 'New', 'More']

const MARKETS = [
  {
    title: "Los Angeles R at Chicago",
    image: "/rams.png",
    outcomes: [
      { name: "Los Angeles R", probability: 65 },
      { name: "Chicago", probability: 36 },
      { name: "LA R -3.5", probability: 54 },
    ],
    volume: "$67.86",
    endDate: "Jan 18",
    comments: 11,
  },
  {
    title: "Buffalo at Denver",
    image: "/broncos.png",
    outcomes: [
      { name: "Buffalo", probability: 53 },
      { name: "Denver", probability: 51 },
      { name: "DEN -2.5", probability: 44 },
    ],
    volume: "$747",
    endDate: "Jan 17",
    comments: 14,
  },
  {
    title: "San Francisco at Seattle",
    image: "/seahawks.png",
    outcomes: [
      { name: "San Francisco", probability: 27 },
      { name: "Seattle", probability: 76 },
      { name: "SEA -7.5", probability: 48 },
    ],
    volume: "$92.25",
    endDate: "Jan 17",
    comments: 14,
  },
  {
    title: "Houston at New England",
    image: "/patriots.png",
    outcomes: [
      { name: "Houston", probability: 40 },
      { name: "New England", probability: 64 },
      { name: "NE -3.5", probability: 45 },
    ],
    volume: "$903",
    endDate: "Jan 18",
    comments: 14,
  },
  {
    title: "Super Bowl Champion 2026",
    image: "/superbowl.png",
    outcomes: [
      { name: "Los Angeles R", probability: 19.8 },
      { name: "Seattle", probability: 23.8 },
      { name: "Buffalo", probability: 16 },
    ],
    volume: "$6,232,234",
    endDate: "Feb 8",
    comments: 2000,
  },
  {
    title: "Will Logan Paul's PSA 10 Pokémon Illustrator Sale Price be over $6 million?",
    image: "/pokemon.png",
    outcomes: [
      { name: "Yes", probability: 99 },
      { name: "No", probability: 1 },
    ],
    volume: "$7,531,664",
    endDate: "Feb 28",
    comments: 1700,
  },
  {
    title: "Will Gold be above $4,400 on January 30th, 2026?",
    image: "/gold.png",
    outcomes: [
      { name: "Yes", probability: 45 },
      { name: "No", probability: 55 },
    ],
    volume: "$234,567",
    endDate: "Jan 30",
    comments: 89,
  },
  {
    title: "2026 NBA Champion",
    image: "/nba.png",
    outcomes: [
      { name: "Oklahoma City Thu", probability: 40 },
      { name: "Boston Celtics", probability: 25 },
      { name: "Cleveland Cavaliers", probability: 15 },
    ],
    volume: "$1,234,567",
    endDate: "Jun 15",
    comments: 456,
  },
  {
    title: "English Premier League Winner",
    image: "/epl.png",
    outcomes: [
      { name: "Man City", probability: 35 },
      { name: "Liverpool", probability: 30 },
      { name: "Arsenal", probability: 20 },
    ],
    volume: "$890,123",
    endDate: "May 25",
    comments: 234,
  },
]

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Markets
          </h1>
          <p className="text-gray-600">
            Put your money where your mouth is and bet on future outcomes on BNB&apos;s favorite prediction market.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {CATEGORIES.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
                {category === 'More' && <ChevronDown className="w-4 h-4 inline ml-1" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Status: Open
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Sort: Popular
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MARKETS.map((market, index) => (
            <MarketCard key={index} {...market} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F8F9FC] py-8 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms & Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Developers</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Docs</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Blog</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
