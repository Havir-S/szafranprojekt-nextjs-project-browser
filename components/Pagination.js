import React from 'react'
import Link from 'next/link'

function Pagination({pages, currentPage}) {
    // function Pagination({}) {
    // const pageCount = Array.from({length: pages}, (_, i) => i + 1)
    // console.log(pageCount)

  return (
    <div className='text-center text-xl flex justify-center items-center w-1/2 mx-auto'>
        {/* <p className=' text-xl'>Strona {currentPage} z {pages}</p> */}
        { currentPage - 1 !== 0 && (
            <Link href={`/${currentPage - 1}`}>
                <img src='./arrowright.svg' alt='' className='cursor-pointer rounded-lg bg-slate-200 border-slate-400 border-2 hover:bg-sky-200 hover:border-sky-600 py-2 px-4 h-12 mx-2' />
            </Link>
        )}
        <div className='flex  flex-wrap justify-center gap-1 my-2 items-center'>
            {new Array(pages).fill(1).map((page,i) => {
                return (
                    <Link href={`/${i + 1}`} key={i} className={` font-bold shadow-sm cursor-pointer px-4 py-2 ${i + 1 === currentPage ? 'bg-sky-100 border-2 border-sky-500' : 'bg-gray-100 border-2 border-gray-300'} rounded-full hover:bg-sky-100 hover:border-sky-300`}>{i + 1}</Link>
                )
            })}
        </div>
        {!(currentPage + 1 > pages) && (
                <Link href={`/${currentPage + 1}`}>
                    <img src='./arrowleft.svg' alt='' className='cursor-pointer rounded-lg bg-slate-200 border-slate-400 border-2 hover:bg-sky-200 hover:border-sky-600 p-2 px-4 h-12 mx-2' />
                </Link>
            )}
    </div>
  )
}

export default Pagination