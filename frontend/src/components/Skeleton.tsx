export function SkeletonCard() {
return (
<div className="animate-pulse space-y-3">
<div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl" />
<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
<div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
</div>
);
}