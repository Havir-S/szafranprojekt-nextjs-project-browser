///VERSION WHICH HAS ALL FILES SAVED AS NAMES IN THE PROJECT, NOT LIKE THE ABOVE VERSION, WHICH SIMPLY SCANS THE DIRECTORY FOR FILES
import dbConnect from '../../../../lib/dbConnect'
import Project from '../../../../models/Project'
import fs from 'fs'
import readline from 'readline'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5gb'
        },
      responseLimit: false,
    },
  }

export default async function handler(req, res) {
    const { query: {id}, method } = req

    await dbConnect()

    // console.log(req.body.project_newFiles.length, req.body.project_filesInfo)

    const projectOld = await Project.findById(id);

    //CHECK FOR NUMBER OR NAME CHANGES
        if (projectOld.project_name !== req.body.project_name || projectOld.project_number !== req.body.project_number || projectOld.project) {
            try {
                fs.renameSync(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
            } catch (err) {
                console.log(err)
            }
        }

    
    ///GETS AN ARRAY OF FILES THAT NO LONGER APPEAR ON THE NEW LIST, SO WE MUST DELETE THEM
    const filesToDelete = projectOld.project_filesInfo.filter(({ name: oldName, size: oldSize }) => !req.body.project_filesInfo.some(({ name: newName, size: newSize }) => (newName === oldName || newSize === oldSize)));
    ///DELETE THEM FROM THE filesInfo TOO
    const new_project_filesInfo = [...projectOld.project_filesInfo.filter(({ name: oldName, size: oldSize }) => req.body.project_filesInfo.some(({ name: newName, size: newSize }) => (newName === oldName || newSize === oldSize)))]
    ////We have files that are no longer on the filesInfo list, so we delete them
    console.log(filesToDelete)
    if (filesToDelete.length > 0) {
        filesToDelete.forEach((file) => {
            console.log(file)
            fs.unlinkSync(`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`, (err) => {
                console.log(err)
                // res.status(500).json({message: 'Wystąpił błąd'})
            })
        })
        
    }

    ////IF we have new files, add them
    if (req.body.project_newFiles.length > 0) {
        req.body.project_newFiles.forEach((file => {
            console.log('NEW FILE')
            new_project_filesInfo.push({
                name: file.name,
                size: file.size
            })
            console.log(file.name, file.size)

            ///FOR BASE64
            const fileBase64 = file.file.replace(/^.+\,/, "");

            fs.writeFileSync(
                (`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`),
                fileBase64,
                'base64',
                async function(err) {
                        if (err) {
                            console.log(err)
                            console.log('There was an error')
                            //IF SOMETHING WENT WRONG DELETE PROJECT
                            
                        } 
                    }
            )

            // fs.createWriteStream(
            //     (`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`),
            //     fileBase64,
            //     'base64',
            //     async function(err) {
            //             if (err) {
            //                 console.log(err)
            //                 console.log('There was an error')
            //                 //IF SOMETHING WENT WRONG DELETE PROJECT
                            
            //             } 
            //         }
            // )

            // let wstream = fs.createWriteStream(`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`)

            // const wstream = fs.createWriteStream(`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`, {encoding: 'base64'})
            // wstream.write(fileBase64)
            // wstream.on("error", (err) => {
            //     console.log(`An error occured while writing to the file. Error: ${err.message}`);

            // });
            // wstream.on("finish", (err) => {
            //     console.log(`finish`);

            // });

            // wstream.write(fileBase64, (err) => {
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         console.log('ding')
            //     }
            // })
        }))
    }
    console.log('THIS IS THE NEW FILESINFO', new_project_filesInfo)


    
        // ///SAVE NEW DATA WITH NEW PROJECT INFO
        const project = await Project.findByIdAndUpdate(id, {...req.body, project_filesInfo: new_project_filesInfo}, { new: true });


    // if (method === 'PUT') {

    // ////////////////////////////////////////////////
    // //////////////////////////////////////////////// SPECIAL ROUTE FOR QUICK FILE DELETE
    // ////////////////////////////////////////////////
    // ///THIS IS A SPECIAL ROUTE THAT QUICKLY UPDATES THE FILE STATUS, DELETING THE INFO ABOUT THE FILE
   



    // ////////////////////////////////////////////////
    // //////////////////////////////////////////////// DEFAULT DOC UPDATE
    // ////////////////////////////////////////////////

        
    //     ///OLD PROJECT
    //     const projectOld = await Project.findById(id);


    //     ////CHECK FOR NUMBER OR NAME CHANGES
    //     if (projectOld.project_name !== req.body.project_name || projectOld.project_number !== req.body.project_number || projectOld.project) {
    //         try {
    //             fs.renameSync(`${projectOld.project_disk}:\\szafranprojekt\\${projectOld.project_number}-${projectOld.project_name}`, `${projectOld.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}`, (err) => {if (err) console.log(err)})
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }

    //     ////WE HAVE FILES TO UPLOAD
    //     if (req.body.project_newFiles.length > 0) {
    //         console.log('WE HAVE FILES');
    //         const newProjectFilesInfo = [...projectOld.project_filesInfo, ...req.body.project_newFiles.map((file) => ({
    //             name: file.name,
    //             size: file.size
    //         }))]
    //         console.log(newProjectFilesInfo)

    //         // ////CHECK IF OLD FILES MATCH NEW FILES


    //         // /////////////////SAVE THE FILES
    //         // /////////////////SAVE THE FILES
    //         // /////////////////SAVE THE FILES
    //         // /////////////////SAVE THE FILES
    //         req.body.project_newFiles.forEach((file => {
    //             console.log(file.name, file.size)

    //             ///FOR BASE64
    //             const fileBase64 = file.file.replace(/^.+\,/, "");

    //             fs.writeFileSync(
    //                 (`${req.body.project_disk}:\\szafranprojekt\\${req.body.project_number}-${req.body.project_name}\\${file.name}`),
    //                 fileBase64,
    //                 'base64',
    //                 async function(err) {
    //                         if (err) {
    //                             // console.log(err)
    //                             console.log('There was an error')
    //                             errorCheck = err;
    //                             //IF SOMETHING WENT WRONG DELETE PROJECT
                                
    //                         } 
    //                     }
    //             )
    //         }))
    //         // ///SAVE NEW DATA WITH NEW PROJECT INFO
    //         const project = await Project.findByIdAndUpdate(id, {...req.body, project_filesInfo: newProjectFilesInfo}, { new: true });
    //     } else {
            
    //         //NO FILES TO UPLOAD, JUST UPDATE THE DOCUMENT
    //         const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    //     }
    //     res.status(200).json({message: 'OK'})
    // }
    res.status(200).json({message: 'OK'})
}


