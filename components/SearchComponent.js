import { useRouter } from 'next/router';
import React, { useRef } from 'react'

function SearchComponent() {
    const inputRef = useRef(null)
    const router = useRouter();

    const startSearch = () => {
        if (!inputRef.current.value) return;
        router.push(`/1?search=${inputRef.current.value}`)
    }

  return (
    <div className='flex items-center text-2xl'>
          <input ref={inputRef} placeholder='Projekt...' className='text-2xl py-5 w-fit rounded-l-lg border-r-0' type='text' />
          <button onClick={() => {startSearch()}} className='inline-block hover:bg-sky-300 border-2 bg-sky-200 border-sky-500 py-1 px-3 rounded-r-lg'>Szukaj</button>
    </div>
  )
}

export default SearchComponent