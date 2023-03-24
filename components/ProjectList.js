import Link from 'next/link'
import React from 'react'

function ProjectList({projects}) {
  return (
    <div>
        {/* ////// FIRST LINE */}
        <div className='flexRow flexRowFirst '>
          <div className='flexCell flexNumber flexCellBorder'>Numer</div>
          <div className='flexCell flexName flexCellBorder'>Nazwa</div>
          <div className='flexCell flexClient flexCellBorder'>Klient</div>
          <div className='flexCell flexStreets flexCellBorder'>Ulice</div>
          <div className='flexCell flexFiles flexCellBorder'>Pliki</div>
          <div className='flexCell flexDate flexCellBorder'>Start</div>
          <div className='flexCell flexDate flexCellBorder'>Termin</div>
          <div className='flexCell flexNumber flexCellBorder'>Kwota</div>
          <div className='flexCell flexStatus '>Status</div>
        </div>

        {projects?.length > 0 ? 
          (projects.map((projekt, id) => {
            return (
            <div key={id} className={`flexRow 
            ${projekt.project_status === 'Zapłacone' ? 'flexRowZaplacone' 
              : projekt.project_status === 'Oczekuje' ? 'flexRowOczekuje' 
              : projekt.project_status === 'Skończony' ? 'flexRowSkonczony' 
              : projekt.project_status === 'W trakcie' ? 'flexRowWTrakcie' 
              : 'flexRowDefault'}  ${(id + 1) === projects.length ? 'flexRowLast' : ''} group `}
            >
              <div className='flexCell flexNumber flexCellBorder text-center'>{projekt.project_number}</div>
              <div className='flexCell flexName flexCellBorder truncate hover:text-clip'>{projekt.project_name}</div>
              <div className='flexCell flexClient flexCellBorder truncate hover:text-clip'>{projekt.project_client}</div>
              <div className='flexCell flexStreets flexCellBorder truncate hover:text-clip'>{projekt.project_streets}</div>
              <div className='flexCell flexFiles flexCellBorder'>{projekt.project_filesNumber}</div>
              <div className='flexCell flexDate flexCellBorder'>
              {projekt.project_start}
              </div>
              <div className='flexCell flexDate flexCellBorder'>
              {projekt.project_termin}
              </div>
              <div className='flexCell flexNumber flexCellBorder'>{projekt.project_price}</div>
              <div className='flexCell flexStatus '>
              {projekt.project_status}
              </div>
              <div className='flexRowOptions hidden group-hover:block'>
                <button className=' cursor-pointer ml-5 font-extrabold shadow-md bg-sky-200 hover:bg-sky-300 text-gray-900 hover:text-black rounded-xl  border-4 border-blue-500 px-4 py-2'>
                  <Link href={`api/projects/delete/${projekt._id}`}>EDYTUJ</Link>
                </button>
              </div>
            </div>
            )
          }
        )) : ('')}
    </div>
  )
}

export default ProjectList