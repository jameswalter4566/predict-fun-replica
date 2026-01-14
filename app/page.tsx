'use client'

import { Navbar } from '@/components/Navbar'
import { MarketCard } from '@/components/MarketCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FEATURED_MARKETS = [
  {
    title: "Will Logan Paul's PSA 10 Pokémon Illustrator Sale Price be over $6 million?",
    volume: "$7,531,664",
  },
  {
    title: "Will Bitcoin reach $150k by end of 2025?",
    volume: "$5,232,100",
  },
  {
    title: "Will the FED change interest rates in January?",
    volume: "$3,891,000",
  },
]

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
]

const LIVE_TRADES = [
  { user: "Discover", action: "Bought No", market: "Will the FED change the interest rates in January?", amount: "14.24 at 96.2¢ ($13.69)", time: "15s ago" },
  { user: "justdoit", action: "Sold No", market: ">$6B", amount: "208 at 97.1¢ ($201.96)", time: "1m ago" },
  { user: "bnbnb", action: "Bought Yes", market: "$1B", amount: "98.67 at 58.6¢ ($57.82)", time: "1m ago" },
  { user: "bnbnb", action: "Bought Yes", market: "$1B", amount: "35.33 at 58.3¢ ($20.59)", time: "1m ago" },
  { user: "bnbnb", action: "Bought Yes", market: "$1B", amount: "53.28 at 58.4¢ ($31.11)", time: "1m ago" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Navbar />

      {/* Featured Market Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            {/* Background pattern */}
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                Featured Market
              </span>
              <span className="text-sm text-gray-600">Total Vol <span className="font-semibold text-gray-900">$7,531,664</span></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 max-w-2xl mb-6">
              Will Logan Paul&apos;s PSA 10 Pokémon Illustrator Sale Price be over $6 million?
            </h2>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white border-2 border-blue-200 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                YES
              </button>
              <button className="px-8 py-3 bg-red-100 border-2 border-red-200 text-red-600 rounded-full font-semibold hover:bg-red-200 transition-colors">
                NO
              </button>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center gap-2 mt-6">
            <button className="p-1 hover:bg-white/50 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <button className="p-1 hover:bg-white/50 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Turn Predictions Into Profits
          </h2>
          <p className="text-gray-600">
            The BNB-native information market where it pays to be right. Bet on outcomes ranging from sports to politics, and cash in on your correct forecasts.
          </p>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {MARKETS.map((market, index) => (
            <MarketCard key={index} {...market} />
          ))}
        </div>

        {/* View All Markets Button */}
        <div className="flex justify-center mb-16">
          <a href="/markets" className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
            View All Markets
          </a>
        </div>
      </section>

      {/* Live Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FC] via-gray-800 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white font-medium">LIVE</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  It&apos;s All Happening on Predict.
                </h3>
                <p className="text-gray-400">
                  Join thousands of other traders cashing in on their hunches in real time.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 max-h-80 overflow-y-auto">
                {LIVE_TRADES.map((trade, index) => (
                  <div key={index} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium text-gray-900">{trade.user}</span>{' '}
                        <span className={trade.action.includes('Bought') ? 'text-green-600' : 'text-red-600'}>
                          {trade.action}
                        </span>{' '}
                        <span className="text-gray-600">• {trade.market}</span>
                      </p>
                      <p className="text-xs text-gray-500">{trade.amount}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{trade.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#5B5FED] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                Fortune Favors the Forecasters
              </h3>
              <p className="text-white/80">
                Place bets, cash in on your predictions, and earn rewards for providing liquidity.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M18 9l-5 5-4-4-3 3" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-purple-600">$400,774,848</p>
                <p className="text-sm text-gray-500">Total volume</p>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-purple-600">$400,258,813</p>
                <p className="text-sm text-gray-500">30d volume</p>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-purple-600">872,424</p>
                <p className="text-sm text-gray-500">Bets made</p>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-purple-600">79,164</p>
                <p className="text-sm text-gray-500">Total users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="bg-gray-900 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-red-500 mb-4" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            We Predict a Riot...
          </h3>
          <p className="text-gray-400 mb-8">
            ...on our social media accounts. Stay in the know and join the conversation.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F9FC] py-8 border-t border-gray-200">
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
