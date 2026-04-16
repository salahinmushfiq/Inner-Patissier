// CheckoutItemSkeleton.jsx
const CheckoutItemSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-secondary-dark-bg border dark:border-gray-800 rounded-2xl animate-pulse">
      <div className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        <div className="flex justify-between items-center pt-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutItemSkeleton;