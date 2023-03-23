import React from 'react'
import Link from 'next/link'
// import Project from '../models/Project'
// import dbConnect from '../lib/dbConnect'

function Header() {

  // dbConnect()

  // const deleteOne = async () => {
  //   console.log('ding')
  //   try {
  //     await Project.findOneAndRemove()
  //   } catch (err) {
  //     console.log(err)
  //   }
    
  // }
  
  return (
    <div className='bg-white flex justify-between items-center shadow-md'>
      <Link href='/' className=' text-2xl font-bold cursor-pointer px-3 py-2 rounded-lg hover:bg-sky-100 hover:border-sky-200 border-2 border-gray-200 m-3 ml-12 bg-gray-100'>Sprawdź Projekty</Link>
      <div className='flex flex-row  items-center justify-center h-full gap-10 mr-12'>

        <div className='flex items-center text-2xl'>
          <input placeholder='Projekt...' className='text-2xl py-5 w-fit rounded-l-lg border-r-0' type='text' />
          <button className='inline-block hover:bg-sky-300 border-2 bg-sky-200 border-sky-500 py-1 px-3 rounded-r-lg'>Szukaj</button>
        </div>
        
        <button onClick={() => {deleteOne()}} className=' text-2xl font-bold cursor-pointer px-3 py-2 rounded-lg hover:bg-sky-100 hover:border-sky-200 border-2 border-gray-200  bg-gray-100'>Ustawienia</button>
        <Link href='/new' className=' text-2xl font-bold cursor-pointer px-3 py-2 rounded-lg hover:bg-sky-100 hover:border-sky-200 border-2 border-gray-200  bg-gray-100'>Dodaj Projekt</Link>

      </div>
    </div>
  )
}

export default Header