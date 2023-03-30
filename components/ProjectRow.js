import React from 'react'

function ProjectRow({projekt, id, length, fastDelete, openFolder, toggleEditor, setCurrentEditingProject}) {
  return (
    <div key={id} className={`flexRow 
        ${projekt.project_status === 'Zapłacone' ? 'flexRowZaplacone' 
            : projekt.project_status === 'Oczekuje' ? 'flexRowOczekuje' 
            : projekt.project_status === 'Skończony' ? 'flexRowSkonczony' 
            : projekt.project_status === 'W trakcie' ? 'flexRowWTrakcie' 
            : 'flexRowDefault'}  ${(id + 1) === length ? 'flexRowLast' : ''} group `}
        >
            <div className='flexCell flexNumber flexCellBorder text-center'>{projekt.project_number}</div>
            <div className='flexCell flexName flexCellBorder truncate hover:text-clip'>{projekt.project_name}</div>
            <div className='flexCell flexClient flexCellBorder truncate hover:text-clip'>{projekt.project_client}</div>
            <div className='flexCell flexClient flexCellBorder truncate hover:text-clip'>{projekt?.project_clientContact}</div>
            <div className='flexCell flexStreets flexCellBorder truncate hover:text-clip'>{projekt.project_streets}</div>
            {/* <div className='flexCell flexFiles flexCellBorder'>{projekt.project_filesNumber}</div> */}
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
            <div className='flexRowOptions  flex-col hidden group-hover:flex gap-1'>
            {/* <div className='flexRowOptions flex flex-col border border-red-500 gap-2'> */}
                <button className=' cursor-pointer ml-5 font-extrabold shadow-md bg-sky-200 hover:bg-sky-300 text-gray-900 hover:text-black rounded-xl  border-4 border-blue-500 px-4 py-2'>
                    {/* <p href={`api/projects/delete/${projekt._id}`}>USUŃ</p> */}
                    <p onClick={() => {openFolder(`${projekt.project_disk}:\\szafranprojekt\\${projekt.project_number}-${projekt.project_name}`)}} >OTWÓRZ</p>
                </button>
                <button className=' cursor-pointer ml-5 font-extrabold shadow-md bg-sky-200 hover:bg-sky-300 text-gray-900 hover:text-black rounded-xl  border-4 border-blue-500 px-4 py-2'>
                    <p onClick={() => {toggleEditor(true); setCurrentEditingProject(projekt)}}>EDYTUJ</p>
                </button>
                <button className=' cursor-pointer ml-5 font-extrabold shadow-md bg-orange-200 hover:bg-red-300 text-gray-900 hover:text-black rounded-xl  border-4 border-orange-500 px-4 py-2'>
                    {/* <p href={`api/projects/delete/${projekt._id}`}>USUŃ</p> */}
                    <p onClick={() => {fastDelete(projekt)}} >USUŃ</p>
                </button>
                <div className='absolute border-4 top-1/2 transform left-1 -translate-y-1/2 h-4 w-4 rotate-45 border-blue-700' />
            </div>
    </div>  
  )
}

export default ProjectRow