import React from 'react'
import Link from 'next/link'
// import Project from '../models/Project'
// import dbConnect from '../lib/dbConnect'
import {addProjects} from '../lib/DEVaddProjects'
import {deleteProject} from '../lib/DEVdeleteProjects'
import SearchComponent from './SearchComponent'

function Header() {

  

  // dbConnect()



  
  return (
    <div className='bg-white flex justify-between items-center shadow-md'>
      <Link href='/1' className=' text-2xl font-bold cursor-pointer px-3 py-2 rounded-lg hover:bg-sky-100 hover:border-sky-200 border-2 border-gray-200 m-3 ml-12 bg-gray-100'>Sprawdź Projekty</Link>
      <div className='flex flex-row  items-center justify-center h-full gap-10 mr-12'>

        {/* <div>
          <div className=' cursor-pointer inline-block hover:bg-sky-300 border-2 bg-sky-200 border-sky-500 py-1 px-3 rounded-l-lg' onClick={() => {addProjects(50)}}>Add 50 projects</div>
          <div className=' cursor-pointer inline-block hover:bg-red-300 border-2 bg-red-200 border-red-500 py-1 px-3 rounded-r-lg' onClick={() => {deleteProject(50)}}>Add 50 projects</div>
        </div> */}
        

        <SearchComponent />
        
        {/* <button onClick={() => {deleteOne()}} className=' text-2xl font-bold cursor-pointer px-3 py-2 rounded-lg hover:bg-sky-100 hover:border-sky-200 border-2 border-gray-200  bg-gray-100'>Ustawienia</button> */}
        <Link href='/new' className=' text-2xl font-bold cursor-pointer px-3 py-2 rounded-lg hover:bg-sky-100 hover:border-sky-200 border-2 border-gray-200  bg-gray-100'>Dodaj Projekt</Link>

      </div>
    </div>
  )
}

export default Header