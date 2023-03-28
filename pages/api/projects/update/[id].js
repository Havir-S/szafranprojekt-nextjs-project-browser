
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

    if (method === 'PUT') {


        
        ///OLD PROJECT
        const projectOld = await Project.findById(id);

        /////////////////CHECK IF DISK CHANGED, IF YES, DELETE OLD FOLDER AND CREATE NEW, LATER
        ///////////////// WAIT NEVER MIND, NO OPTION TO CHANGE THE FOLDER, MAKE IT DISABLED AND JUST SHOW THE PATH
        //////////////// ONLY RENAME THE FOLDER
        // console.log(projectOld.project_name, req.body.project_name)



        if (projectOld.project_name !== req.body.project_name || projectOld.project_number !== req.body.project_number || projectOld.project) {
            try {
                fs.renameSync(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
            } catch (err) {
                console.log(err)
            }
        }

        console.log(projectOld.project_filesInfo)

        ////WE HAVE FILES UPLOADED
        if (req.body.project_files.length > 0) {
            const newProjectFilesInfo = req.body.project_files.map((file) => ({
                name: file.name,
                size: file.size
            }))
            // console.log(newProjectFilesInfo)

            ////CHECK IF OLD FILES MATCH NEW FILES


            /////////////////SAVE THE FILES
            /////////////////SAVE THE FILES
            /////////////////SAVE THE FILES
            /////////////////SAVE THE FILES
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
                                fs.rmSync(`${req.body.disk}:\\szafranprojekt\\${navigateDate.getFullYear()}\\${navigateDate.getMonth()}\\${newProject.id}`, { recursive: true, force: true });
                            } 
                        }
                )
            }))
            ///SAVE NEW DATA WITH NEW PROJECT INFO

            const project = await Project.findByIdAndUpdate(id, {...req.body, project_filesInfo: newProjectFilesInfo}, { new: true });
            // console.log(project)
        }


        
        
        


       
        

        

        // if (projectOld.project)
            // try {
            //     fs.rename(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
            // } catch (err) {
            //     console.log(err)
            // }

        
        res.status(200).json({message: 'OK'})
    }
}


///VERSION WHICH HAS ALL FILES SAVED AS NAMES IN THE PROJECT, NOT LIKE THE ABOVE VERSION, WHICH SIMPLY SCANS THE DIRECTORY FOR FILES
// import dbConnect from '../../../../lib/dbConnect'
// import Project from '../../../../models/Project'
// import fs from 'fs'

// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: '5000mb'
//         },
//       responseLimit: false,
//     },
//   }

// export default async function handler(req, res) {
//     const { query: {id}, method } = req

//     await dbConnect()

//     if (method === 'PUT') {


        
//         ///OLD PROJECT
//         const projectOld = await Project.findById(id);

//         /////////////////CHECK IF DISK CHANGED, IF YES, DELETE OLD FOLDER AND CREATE NEW, LATER
//         ///////////////// WAIT NEVER MIND, NO OPTION TO CHANGE THE FOLDER, MAKE IT DISABLED AND JUST SHOW THE PATH
//         //////////////// ONLY RENAME THE FOLDER
//         // console.log(projectOld.project_name, req.body.project_name)



//         if (projectOld.project_name !== req.body.project_name || projectOld.project_number !== req.body.project_number || projectOld.project) {
//             try {
//                 fs.renameSync(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
//             } catch (err) {
//                 console.log(err)
//             }
//         }

//         console.log(projectOld.project_filesInfo)

//         ////WE HAVE FILES UPLOADED
//         if (req.body.project_files.length > 0) {
//             const newProjectFilesInfo = req.body.project_files.map((file) => ({
//                 name: file.name,
//                 size: file.size
//             }))
//             // console.log(newProjectFilesInfo)

//             ////CHECK IF OLD FILES MATCH NEW FILES


//             /////////////////SAVE THE FILES
//             /////////////////SAVE THE FILES
//             /////////////////SAVE THE FILES
//             /////////////////SAVE THE FILES
//             req.body.project_files.forEach((file => {
//                 console.log(file.name, file.size)

//                 ///FOR BASE64
//                 const fileBase64 = file.file.replace(/^.+\,/, "");

//                 fs.writeFileSync(
//                     (`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`),
//                     fileBase64,
//                     'base64',
//                     async function(err) {
//                             if (err) {
//                                 // console.log(err)
//                                 console.log('There was an error')
//                                 errorCheck = err;
//                                 //IF SOMETHING WENT WRONG DELETE PROJECT
//                                 fs.rmSync(`${req.body.disk}:\\szafranprojekt\\${navigateDate.getFullYear()}\\${navigateDate.getMonth()}\\${newProject.id}`, { recursive: true, force: true });
//                             } 
//                         }
//                 )
//             }))
//             ///SAVE NEW DATA WITH NEW PROJECT INFO

//             const project = await Project.findByIdAndUpdate(id, {...req.body, project_filesInfo: newProjectFilesInfo}, { new: true });
//             // console.log(project)
//         }


        
        
        


       
        

        

//         // if (projectOld.project)
//             // try {
//             //     fs.rename(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
//             // } catch (err) {
//             //     console.log(err)
//             // }

        
//         res.status(200).json({message: 'OK'})
//     }
// }


