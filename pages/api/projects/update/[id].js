///VERSION WHICH HAS ALL FILES SAVED AS NAMES IN THE PROJECT, NOT LIKE THE ABOVE VERSION, WHICH SIMPLY SCANS THE DIRECTORY FOR FILES
import dbConnect from '../../../../lib/dbConnect'
import Project from '../../../../models/Project'
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

    console.log(req.body)


    if (method === 'PUT') {

    ////////////////////////////////////////////////
    //////////////////////////////////////////////// SPECIAL ROUTE FOR QUICK FILE DELETE
    ////////////////////////////////////////////////
    ///THIS IS A SPECIAL ROUTE THAT QUICKLY UPDATES THE FILE STATUS, DELETING THE INFO ABOUT THE FILE
   



    ////////////////////////////////////////////////
    //////////////////////////////////////////////// DEFAULT DOC UPDATE
    ////////////////////////////////////////////////

        
        ///OLD PROJECT
        const projectOld = await Project.findById(id);


        ////CHECK FOR NUMBER OR NAME CHANGES
        if (projectOld.project_name !== req.body.project_name || projectOld.project_number !== req.body.project_number || projectOld.project) {
            try {
                fs.renameSync(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
            } catch (err) {
                console.log(err)
            }
        }

        ////WE HAVE FILES TO UPLOAD
        if (req.body.project_files.length > 0) {
            console.log('WE HAVE FILES');
            const newProjectFilesInfo = [...projectOld.project_filesInfo, ...req.body.project_files.map((file) => ({
                name: file.name,
                size: file.size
            }))]
            console.log(newProjectFilesInfo)

            // ////CHECK IF OLD FILES MATCH NEW FILES


            // /////////////////SAVE THE FILES
            // /////////////////SAVE THE FILES
            // /////////////////SAVE THE FILES
            // /////////////////SAVE THE FILES
            req.body.project_files.forEach((file => {
                console.log(file.name, file.size)

                ///FOR BASE64
                const fileBase64 = file.file.replace(/^.+\,/, "");

                fs.writeFileSync(
                    (`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`),
                    fileBase64,
                    'base64',
                    async function(err) {
                            if (err) {
                                // console.log(err)
                                console.log('There was an error')
                                errorCheck = err;
                                //IF SOMETHING WENT WRONG DELETE PROJECT
                                
                            } 
                        }
                )
            }))
            // ///SAVE NEW DATA WITH NEW PROJECT INFO
            const project = await Project.findByIdAndUpdate(id, {...req.body, project_filesInfo: newProjectFilesInfo}, { new: true });
        } else {
            
            //NO FILES TO UPLOAD, JUST UPDATE THE DOCUMENT
            const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
        }
        res.status(200).json({message: 'OK'})
    }
}


