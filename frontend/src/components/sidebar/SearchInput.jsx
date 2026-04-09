import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long");
      return;
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 hover:bg-slate-600 text-white border-none shadow-none"
      >
        <IoSearch className="w-6 h-5 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
