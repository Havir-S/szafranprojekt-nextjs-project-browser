import Link from 'next/link'
import { useState } from 'react'
import EditProject from '../components/EditProject'
import ProjectList from '../components/ProjectList'
import dbConnect from '../lib/dbConnect'
import Project from '../models/Project'

import TEMPLATE_PROJECTS from './TEMP.js'


const Index = ({ projects }) => { 
  const [editor, toggleEditor] = useState(false)
  const [currentEditingProject, setCurrentEditingProject] = useState({})
  return (
  <div className='mb-24 '>
    <div className='bg-white w-fit mx-auto border-2 mt-16  rounded-md'>
      <p className='text-6xl text-center font-bold my-5'>Projekty</p>
      <div className=' flexHolder  w-fit mx-auto'>

      {/* /////// ZROBIĆ KWADRACIK NA NOTKI CO ZROBIĆ ITP */}
        <ProjectList setCurrentEditingProject={setCurrentEditingProject} projects={projects} toggleEditor={toggleEditor} />

        {editor && (
          <EditProject setCurrentEditingProject={setCurrentEditingProject} currentEditingProject={currentEditingProject} toggleEditor={toggleEditor} />
        )}
        
      </div>
    </div>
  </div>
)}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const resultsProjects = await Project.find({})
  const projects = resultsProjects.map((doc) => {
    const project= doc.toObject();
    project._id = project._id.toString()
    return project
  })



  return { props: {  projects:projects } }
}

export default Index