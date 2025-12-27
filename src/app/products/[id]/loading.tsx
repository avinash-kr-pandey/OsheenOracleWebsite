// app/products/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-18">
      <div className="animate-pulse">
        {/* Product Info Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
