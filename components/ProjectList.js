import Link from 'next/link'
import React from 'react'
import ProjectRow from './ProjectRow';

function ProjectList({projects, openFolder, toggleEditor, setCurrentEditingProject}) {

  const fastDelete = async (id) => {
    try {
      await fetch(`api/projects/delete/${id}`);
    } catch (e) {
      console.log(e)
    }
  }

 
  return (
    <div>
        {/* ////// FIRST LINE */}
        <div className='flexRow flexRowFirst '>
          <div className='flexCell flexNumber flexCellBorder'>Numer</div>
          <div className='flexCell flexName flexCellBorder'>Nazwa</div>
          <div className='flexCell flexClient flexCellBorder'>Klient</div>
          <div className='flexCell flexStreets flexCellBorder'>Ulice</div>
          {/* <div className='flexCell flexFiles flexCellBorder'>Pliki</div> */}
          <div className='flexCell flexDate flexCellBorder'>Start</div>
          <div className='flexCell flexDate flexCellBorder'>Termin</div>
          <div className='flexCell flexNumber flexCellBorder'>Kwota</div>
          <div className='flexCell flexStatus '>Status</div>
        </div>

        {projects?.length > 0 ? 
          (projects.map((projekt, id) => {
            return (
            <ProjectRow key={id} fastDelete={fastDelete} openFolder={openFolder} setCurrentEditingProject={setCurrentEditingProject} toggleEditor={toggleEditor} length={projects?.length} projekt={projekt} id={id} />
            )
          }
        )) : ('')}
    </div>
  )
}

export default ProjectList