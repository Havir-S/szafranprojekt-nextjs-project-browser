import dbConnect from '../../../lib/dbConnect'
import Project from '../../../models/Project'
import fs from 'fs';
import { checkDrives } from '../../../lib/drives';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      // try {
      //   const pets = await Pet.find({}) /* find all the data in our database */
      //   res.status(200).json({ success: true, data: pets })
      // } catch (error) {
      //   res.status(400).json({ success: false })
      // }
      console.log('ding')
      try {
        await Project.findOne({}).deleteOne()
          res.status(200).json({ success: true,  })
      } catch (err) {
          res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        

        /////CHECK DRIVES
        const drives = checkDrives()

        /////CREATE FOLDER
        
        /////CREATE DOCUMENT 
        const project = await Project.create( req.body )


        /////CREATE FOLDER FOR DOCUMENT FILES
        // console.log(`${req.body.project_disk}:\\szafranprojekt\\${project._id.toString()}`)
        try {
          if (!fs.existsSync(`${req.body.project_disk}:\\szafranprojekt\\${project._id.toString()}`)) {
            fs.mkdirSync(`${req.body.project_disk}:\\szafranprojekt\\${project._id.toString()}`, { recursive: true });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, })
        }

     

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
