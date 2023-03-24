import dbConnect from '../../../lib/dbConnect'
import Project from '../../../models/Project'
import fs from 'fs';
import { checkDrives } from '../../../lib/drives';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()
  switch (method) {
    ///////////////////////////////////////////////// GET PROJECT
      ///////////////////////////////////////////////// GET PROJECT
      ///////////////////////////////////////////////// GET PROJECT
    case 'GET':
    
      console.log('ding GET')
      try {
        const user = await Project.findOne({})

        // fs.rmSync(`${user.project_disk}:\\szafranprojekt\\${user.id}`, { recursive: true, force: true });
        // user.remove();
        
          res.status(200).json({ success: true,  })
      } catch (err) {
        console.log(err)
          res.status(400).json({ success: false })
      }
      break
      ///////////////////////////////////////////////// CREATE PROJECT
      ///////////////////////////////////////////////// CREATE PROJECT
      ///////////////////////////////////////////////// CREATE PROJECT
    case 'POST':
      try {
        /////CREATE DOCUMENT 
        console.log(req.body)
        const project = await Project.create({ 
          ...req.body, 
          // project_path:
          // project_disk: `${req.body.project_disk}`
          })

          /////CREATE FOLDER
          if (!fs.existsSync(`${project.project_disk}:\\szafranprojekt\\${project.project_number}-${project.project_name}`)) {
            fs.mkdirSync(`${project.project_disk}:\\szafranprojekt\\${project.project_number}-${project.project_name}`, { recursive: true });
          }


        res.status(201).json({ success: true, })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break


      ///////////////////////////////////////////////// UPDATE PROJECT
      ///////////////////////////////////////////////// UPDATE PROJECT
      ///////////////////////////////////////////////// UPDATE PROJECT
    case 'PUT':
      try {
        /////FIND DOCUMENT
        // console.log(req.body)
        // const project = await Project.findById(id)
        // console.log(project)

        res.status(201).json({ success: true, })
        // res.status(201).json({ success: true, data: project})
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
