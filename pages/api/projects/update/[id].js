
import dbConnect from '../../../../lib/dbConnect'
import Project from '../../../../models/Project'
import fs from 'fs'

export default async function handler(req, res) {
    const { query: {id}, method } = req

    await dbConnect()

    if (method === 'PUT') {
        
        const projectOld = await Project.findById(id);
        /////////////////CHECK IF DISK CHANGED, IF YES, DELETE OLD FOLDER AND CREATE NEW, LATER
        ///////////////// WAIT NEVER MIND, NO OPTION TO CHANGE THE FOLDER, MAKE IT DISABLED AND JUST SHOW THE PATH
        //////////////// ONLY RENAME THE FOLDER
        console.log(projectOld.project_name, req.body.project_name)
        if (projectOld.project_name !== req.body.project_name || projectOld.project_number !== req.body.project_number || projectOld.project) {
            try {
                fs.rename(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
            } catch (err) {
                console.log(err)
            }
        }

        // if (projectOld.project)

        const project = await Project.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
        // console.log(project)
        res.status(200).json({message: 'OK'})
    }

    



}