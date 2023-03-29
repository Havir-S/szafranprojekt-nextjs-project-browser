import React from 'react'
import Link from 'next/link'

function Pagination({pages, currentPage}) {
    // function Pagination({}) {
    // const pageCount = Array.from({length: pages}, (_, i) => i + 1)
    // console.log(pageCount)

  return (
    <div className='text-center text-xl'>
        {/* <p className=' text-xl'>Strona {currentPage} z {pages}</p> */}
        <div className='flex justify-center gap-1 my-2 items-center'>



       

        { currentPage - 1 !== 0 && (
            <Link href={`/${currentPage - 1}`}>
                <img src='./arrowright.svg' alt='' className='cursor-pointer rounded-lg bg-slate-200 border-slate-400 border-2 hover:bg-sky-200 hover:border-sky-600 p-2 h-12 mx-2' />
            </Link>
        )}
            
            {new Array(pages).fill(1).map((page,i) => {
                return (
                    <Link href={`/${i + 1}`} key={i} className={` font-bold shadow-sm cursor-pointer px-4 py-2 ${i + 1 === currentPage ? 'bg-sky-100 border-2 border-sky-500' : 'bg-gray-100 border-2 border-gray-300'} rounded-full hover:bg-sky-100 hover:border-sky-300`}>{i + 1}</Link>
                )
            })}
            {!(currentPage + 1 > pages) && (
                <Link href={`/${currentPage + 1}`}>
                    <img src='./arrowleft.svg' alt='' className='cursor-pointer rounded-lg bg-slate-200 border-slate-400 border-2 hover:bg-sky-200 hover:border-sky-600 p-2 h-12 mx-2' />
                </Link>
            )}
            
        </div>
    </div>
  )
}

export default Pagination