import dbConnect from '../../../../lib/dbConnect';
import Project from '../../../../models/Project';
import fs from 'fs';

export default async function handler(req, res) {
  const { query: { id } } = req

  console.log(id)

//   res.status(200).json({ success: true,  })
  await dbConnect()

  try {
    const project = await Project.findById(id)
    console.log(project)

    fs.rmSync(`${project.project_disk}:\\szafranprojekt\\${project.project_number}-${project.project_name}`, { recursive: true, force: true });
    project.remove();
    
      res.status(200).json({ success: true,  })
  } catch (err) {
    console.log(err)
      res.status(400).json({ success: false })
  }
}
