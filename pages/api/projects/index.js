import dbConnect from '../../../lib/dbConnect'
import Project from '../../../models/Project'
import fs from 'fs';
import { checkDrives } from '../../../lib/drives';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
    
      console.log('ding')
      try {
        const user = await Project.findOne({})

        fs.rmSync(`${user.project_disk}:\\szafranprojekt\\${user.id}`, { recursive: true, force: true });
        user.remove();
        
          res.status(200).json({ success: true,  })
      } catch (err) {
        console.log(err)
          res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        

        /////CHECK DRIVES
        const drives = checkDrives()

        /////CREATE FOLDER
        
        /////CREATE DOCUMENT 
        const project = await Project.create({ 
          ...req.body, 
          // project_disk: `${req.body.project_disk}`
          })


        
     

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
