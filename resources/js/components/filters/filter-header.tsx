
export function FilterHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-md font-semibold">Filters</h3>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-sm text-blue-600 dark:text-blue-400 lg:hidden"
      >
        Back to top
      </button>
    </div>
  );
}
