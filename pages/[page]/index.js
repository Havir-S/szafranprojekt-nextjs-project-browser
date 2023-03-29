import Link from 'next/link'
import { useState } from 'react'
import EditProject from '../../components/EditProject'
import Pagination from '../../components/Pagination'
import ProjectList from '../../components/ProjectList'
import dbConnect from '../../lib/dbConnect'
import Project from '../../models/Project'

import TEMPLATE_PROJECTS from '../TEMP'


const Index = ({ projects, numberOfPages, currentPage }) => { 
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
      <Pagination pages={numberOfPages} currentPage={Number(currentPage)} />
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

export async function getServerSideProps({query}) {

  const page = query.page
  // console.log(page)
  const LIMIT = 10
  const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page

  await dbConnect()
    const total = await Project.countDocuments({})
    // console.log(total)
   
  // const resultsProjects = await Project.find({}).limit(10)
  // const resultsProjects2 = await Project.find({}).sort({project_number: -1}).limit(LIMIT).skip(startIndex).lean();
  const resultsProjects2 = await Project.find({}).sort({project_number: -1}).limit(LIMIT).skip(startIndex)
  
  const projects = resultsProjects2.map((doc) => {
    const project= doc.toObject();
    project._id = project._id.toString()
    return project
  })



  return { props: {  projects:projects, numberOfPages: Math.ceil(total / LIMIT), currentPage: page } }
  // return { props: {  projects:projects} }
}



export default Index