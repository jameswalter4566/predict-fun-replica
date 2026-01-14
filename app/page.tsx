'use client'

import { Navbar } from '@/components/Navbar'
import { MarketCard } from '@/components/MarketCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MARKETS = [
  {
    title: "Los Angeles R at Chicago",
    image: "/rams.png",
    outcomes: [
      { name: "Los Angeles R", probability: 65 },
      { name: "Chicago", probability: 36 },
      { name: "LA R -3.5", probability: 50 },
    ],
    volume: "$588",
    endDate: "Jan 18",
    comments: 22,
  },
  {
    title: "Buffalo at Denver",
    image: "/broncos.png",
    outcomes: [
      { name: "Buffalo", probability: 52 },
      { name: "Denver", probability: 51 },
      { name: "DEN -2.5", probability: 44 },
    ],
    volume: "$2,617",
    endDate: "Jan 17",
    comments: 25,
  },
  {
    title: "San Francisco at Seattle",
    image: "/seahawks.png",
    outcomes: [
      { name: "San Francisco", probability: 24 },
      { name: "Seattle", probability: 75 },
      { name: "SEA -7.5", probability: 48 },
    ],
    volume: "$133",
    endDate: "Jan 17",
    comments: 17,
  },
  {
    title: "Houston at New England",
    image: "/patriots.png",
    outcomes: [
      { name: "Houston", probability: 40 },
      { name: "New England", probability: 64 },
      { name: "NE -3.5", probability: 45 },
    ],
    volume: "$940",
    endDate: "Jan 18",
    comments: 15,
  },
  {
    title: "Super Bowl Champion 2026",
    image: "/superbowl.png",
    outcomes: [
      { name: "Los Angeles R", probability: 19.8 },
      { name: "Seattle", probability: 24 },
      { name: "Buffalo", probability: 14 },
    ],
    volume: "$6,232,880",
    endDate: "Feb 8",
    comments: 2000,
  },
  {
    title: "Will Logan Paul's PSA 10 Pokemon Illustrator Sale Price be over $6 million?",
    image: "/pokemon.png",
    outcomes: [
      { name: "Yes", probability: 99 },
      { name: "No", probability: 1 },
    ],
    volume: "$7,560,305",
    endDate: "Feb 28",
    comments: 1800,
  },
]

const LIVE_TRADES = [
  { user: "PrePaul", action: "Bought No", market: "January 31, 2026", amount: "36", price: "90.4", total: "$32.54", time: "10s ago" },
  { user: "PrePaul", action: "Bought No", market: "January 31, 2026", amount: "101", price: "90.4", total: "$91.3", time: "10s ago" },
  { user: "PrePaul", action: "Bought No", market: "January 31, 2026", amount: "101", price: "90.4", total: "$91.3", time: "10s ago" },
  { user: "PrePaul", action: "Bought No", market: "January 31, 2026", amount: "300", price: "90.4", total: "$271.2", time: "10s ago" },
  { user: "PrePaul", action: "Bought No", market: "January 31, 2026", amount: "101", price: "90.4", total: "$91.3", time: "10s ago" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Featured Market Section */}
      <div className="hidden md:block">
        <div className="featured-gradient py-12 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2.5 py-1 rounded-md">
                  Featured Market
                </span>
                <span className="text-sm text-gray-500">
                  Total Vol <span className="font-semibold text-gray-900">$7,560,305</span>
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-purple-700 leading-tight mb-8">
                Will Logan Paul&apos;s PSA 10 Pokemon Illustrator Sale Price be over $6 million?
              </h1>

              <div className="flex items-center gap-4">
                <button className="w-[140px] py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all">
                  YES
                </button>
                <button className="w-[140px] py-3 rounded-xl border-2 border-gray-200 bg-white text-red-500 font-semibold hover:border-red-400 hover:bg-red-50 transition-all">
                  NO
                </button>
              </div>

              {/* Carousel Dots */}
              <div className="flex items-center gap-2 mt-6">
                <button className="p-1 hover:bg-gray-200/50 rounded transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <div className="carousel-dot active"></div>
                <div className="carousel-dot"></div>
                <div className="carousel-dot"></div>
                <button className="p-1 hover:bg-gray-200/50 rounded transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Markets Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-2">
            Turn Predictions Into Profits
          </h2>
          <p className="text-gray-500 max-w-2xl">
            The BNB-native information market where it pays to be right. Bet on outcomes ranging from sports to politics, and cash in on your correct forecasts.
          </p>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MARKETS.map((market, index) => (
            <MarketCard key={index} {...market} />
          ))}
        </div>

        {/* View All Markets Button */}
        <div className="flex justify-center mt-10">
          <a href="/markets" className="btn-primary">
            View All Markets
          </a>
        </div>
      </div>

      {/* Live Section */}
      <div className="mx-4 lg:mx-auto max-w-screen-xl">
        <div className="live-section-bg rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-400 text-sm font-semibold tracking-wide">LIVE</span>
                <div className="live-dot"></div>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                It&apos;s All Happening on Predict.
              </h2>
              <p className="text-gray-400">
                Join thousands of other traders cashing in on their hunches in real time.
              </p>
            </div>

            {/* Live Trades Feed */}
            <div className="bg-white rounded-2xl p-4 max-h-[320px] overflow-y-auto">
              <div className="space-y-1">
                {LIVE_TRADES.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm">
                          <span className="font-semibold text-gray-900">{trade.user}</span>
                          {' '}
                          <span className="text-red-500 font-medium">{trade.action}</span>
                          {' '}
                          <span className="text-gray-500">• {trade.market}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {trade.amount} at {trade.price}c ({trade.total})
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{trade.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-4 lg:mx-auto max-w-screen-xl mt-6">
        <div className="stats-section-bg rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white">
                Fortune Favors the Forecasters
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div className="text-xl md:text-2xl font-bold text-purple-600 mb-0.5">$405,515,552</div>
                <div className="text-sm text-gray-500">Total volume</div>
              </div>
              <div className="bg-white rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="text-xl md:text-2xl font-bold text-purple-600 mb-0.5">$404,958,149</div>
                <div className="text-sm text-gray-500">30d volume</div>
              </div>
              <div className="bg-white rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div className="text-xl md:text-2xl font-bold text-purple-600 mb-0.5">872,424</div>
                <div className="text-sm text-gray-500">Bets made</div>
              </div>
              <div className="bg-white rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="text-xl md:text-2xl font-bold text-purple-600 mb-0.5">79,164</div>
                <div className="text-sm text-gray-500">Total users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">
            Join the Community
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Follow us on social media and join our Discord to stay up to date with the latest markets and community discussions.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-screen-xl mx-auto px-4">
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
