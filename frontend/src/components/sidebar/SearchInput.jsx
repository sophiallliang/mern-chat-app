import { IoSearch, IoClose } from "react-icons/io5";

const SearchInput = ({ search, setSearch }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="input rounded-full w-full pr-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <IoClose
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setSearch("")}
          />
        )}
      </div>
      <button className="btn btn-circle bg-sky-500 hover:bg-slate-600 text-white border-none shadow-none">
        <IoSearch className="w-6 h-5 outline-none" />
      </button>
    </div>
  );
};
export default SearchInput;
