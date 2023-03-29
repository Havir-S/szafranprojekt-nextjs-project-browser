import fs from 'fs'
import Project from '../../../models/Project'


export default async function handler(req, res) {
    // console.log('ding')
    // console.log(req.body)
    const data = JSON.parse(req.body);
    // console.log(data.fileToDelete)

    
    const project = await Project.findById(data.project._id).catch(err => {
        console.log(err, 'AAA')
    })

    // console.log(project.project_filesInfo)
    const newFilesInfo = project.project_filesInfo.filter(file => (file.name !== data.fileToDelete.name && file.size !== data.fileToDelete.size))
    project.project_filesInfo = newFilesInfo
    project.save()




    // fs.rmSync(req.body, { recursive: true, force: true });
    fs.unlinkSync(`${data.project.project_disk}:\\szafranprojekt\\${data.project.project_number}-${data.project.project_name}\\${data.fileToDelete.name}`, (err) => {
        console.log(err)
        res.status(500).json({message: 'Wystąpił błąd'})
    })
    res.status(200).json({message: 'OK'})
}