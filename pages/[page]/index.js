import Link from 'next/link'
import { useState } from 'react'
import EditProject from '../../components/EditProject'
import Notes from '../../components/Notes'
import Pagination from '../../components/Pagination'
import ProjectList from '../../components/ProjectList'
import dbConnect from '../../lib/dbConnect'
import Project from '../../models/Project'
import Note from '../../models/Note'

import TEMPLATE_PROJECTS from '../TEMP'


const Index = ({ projects, numberOfPages, currentPage, notes }) => { 
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
    <Notes notes={JSON.parse(notes)} />
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

// export async function getServerSideProps(context) {
export async function getServerSideProps({query}) {
  // console.log(context)
  const {page, search} = query

  // const {query: page2} = context
  const LIMIT = 10
  const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page

  await dbConnect()
    const total = await Project.find((search ? {$text: {$search: search}} : {})).countDocuments({})
  // const resultsProjects2 = await Project.find({}).sort({project_number: -1}).limit(LIMIT).skip(startIndex).lean();
  const resultsProjects2 = await Project.find((search ? {$text: {$search: search}} : {})).sort({project_number: -1}).limit(LIMIT).skip(startIndex)
  // const resultsProjects2 = await Project.find((search ? {$text: {$search: { regex: { path: 'project_name', query: `.*${search}.*`, allowAnalyzedField: true }} }} : {})).sort({project_number: -1}).limit(LIMIT).skip(startIndex)
  
  const projects = resultsProjects2.map((doc) => {
    const project= doc.toObject();
    project._id = project._id.toString()
    return project
  })

  const notes = await Note.find({})
  // const realNotes = notes.map((doc) => {
  //   const note = doc.toObject();
  //   return note;
  // })

  const realNotes = JSON.stringify(notes)



  return { props: {  projects:projects, numberOfPages: Math.ceil(total / LIMIT), currentPage: page, notes:realNotes } }
  // return { props: {  projects:projects} }
}



export default Index