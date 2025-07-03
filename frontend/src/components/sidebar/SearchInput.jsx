import React from 'react'
import { IoSearch } from "react-icons/io5";


const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder='Search...' className='input rounded-full'/>
        <button type="submit" className='btn btn-circle bg-sky-500 hover:bg-slate-600 text-white border-none shadow-none'>
            <IoSearch className='w-6 h-5 outline-none'/>
        </button>
    </form>
  )
}
export default SearchInput
