import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import DeleteModal from './DeleteModal';
import ProjectRow from './ProjectRow';

function ProjectList({projects, openFolder, toggleEditor, setCurrentEditingProject}) {
  const [deleteModal, toggleDeleteModal] = useState(false)
  const [deleteProject, setDeleteProject] = useState({})
  
  const fastDelete = (proj) => {
    setDeleteProject(proj)
    toggleDeleteModal(true)
    
  }

 
  return (
    <div>
        {/* ////// FIRST LINE */}
        <div className='flexRow flexRowFirst '>
          <div className='flexCell flexNumber flexCellBorder'>Numer</div>
          <div className='flexCell flexName flexCellBorder'>Nazwa</div>
          <div className='flexCell flexClient flexCellBorder'>Klient</div>
          <div className='flexCell flexClient flexCellBorder'>Kontakt</div>
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

        {deleteModal && (
          <DeleteModal deleteProject={deleteProject} toggleDeleteModal={toggleDeleteModal} setDeleteProject={setDeleteProject} deleteModal={deleteModal} />
        )}
    </div>
  )
}

export default ProjectList