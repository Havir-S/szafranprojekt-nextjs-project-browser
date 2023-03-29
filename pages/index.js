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

  const openFolder = async (path) => {
    try {
      await fetch(`api/openfolder`, {
        method: 'POST',
        body: JSON.stringify(path)
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
  <div className='mb-24 '>
    <div className='bg-white w-fit mx-auto border-2 mt-16  rounded-md'>
      <p className='text-6xl text-center font-bold my-5'>Projekty</p>
      <div className=' flexHolder  w-fit mx-auto'>

      {/* /////// ZROBIĆ KWADRACIK NA NOTKI CO ZROBIĆ ITP */}
        <ProjectList openFolder={openFolder} setCurrentEditingProject={setCurrentEditingProject} projects={projects} toggleEditor={toggleEditor} />

        {editor && (
          <EditProject openFolder={openFolder} setCurrentEditingProject={setCurrentEditingProject} currentEditingProject={currentEditingProject} toggleEditor={toggleEditor} />
        )}
        
      </div>
    </div>
  </div>
)}

export async function getServerSideProps() {
  await dbConnect()

  const resultsProjects = await Project.find({})
  const projects = resultsProjects.map((doc) => {
    const project= doc.toObject();
    project._id = project._id.toString()
    return project
  })



  return { props: {  projects:projects } }
}

export default Index