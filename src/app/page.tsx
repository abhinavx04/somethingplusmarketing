'use client'

import CarList from '@/components/cars/CarList'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <div className="p-5">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white glow-effect">
            Available Cars
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Browse through our collection of premium vehicles
          </p>
        </div>

        <CarList />
      </div>
    </div>
  )
}