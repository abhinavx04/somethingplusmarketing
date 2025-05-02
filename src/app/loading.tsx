export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-700/50 rounded-lg mb-8"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-xl p-4">
              <div className="h-48 bg-gray-700/50 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-700/50 rounded-lg w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700/50 rounded-lg w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}