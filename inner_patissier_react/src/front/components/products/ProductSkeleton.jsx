import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="w-full max-w-[320px] bg-white border rounded-2xl overflow-hidden shadow-sm animate-pulse">
      
      {/* Image skeleton */}
      <div className="aspect-[4/5] bg-gray-200" />

      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4" />

        {/* Description */}
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />

        {/* Price + button */}
        <div className="flex justify-between items-center mt-5">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-10 w-10 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;