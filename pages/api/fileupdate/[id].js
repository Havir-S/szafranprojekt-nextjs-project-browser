///VERSION WHICH HAS ALL FILES SAVED AS NAMES IN THE PROJECT, NOT LIKE THE ABOVE VERSION, WHICH SIMPLY SCANS THE DIRECTORY FOR FILES
import dbConnect from '../../../lib/dbConnect'
import Project from '../../../models/Project'
import fs from 'fs'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5000mb'
        },
      responseLimit: false,
    },
  }

export default async function handler(req, res) {
    const { query: {id}, method } = req

    await dbConnect()

    console.log('TO CO POWINNO BYC',req.body)


    if (method === 'PUT') {

    ////////////////////////////////////////////////
    //////////////////////////////////////////////// SPECIAL ROUTE FOR QUICK FILE DELETE
    ////////////////////////////////////////////////
    ///THIS IS A SPECIAL ROUTE THAT QUICKLY UPDATES THE FILE STATUS, DELETING THE INFO ABOUT THE FILE

    const projectOld = await Project.findById(id);
    console.log('TERA', projectOld)
    // projectOld.project_filesInfo = 
    res.status(200).json({message: 'OK'})
    }
}


