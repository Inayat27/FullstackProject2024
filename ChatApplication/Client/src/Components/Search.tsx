const Search = () => {
  return (
    <div className="h-[60px] border border-gray-300 ">
      <form className="flex-grow  relative top-2 px-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full py-2 ps-10 text-sm  text-gray-900  border border-gray-400 rounded bg-gray-50  dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black focus:outline-none focus:ring-0 focus:border-gray-200"
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
