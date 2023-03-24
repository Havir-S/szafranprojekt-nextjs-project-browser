import dbConnect from '../../../../lib/dbConnect';
import Project from '../../../../models/Project';
import fs from 'fs';

export default async function handler(req, res) {
  const { query: { id } } = req

  console.log(id)

//   res.status(200).json({ success: true,  })
  await dbConnect()

  try {
    const user = await Project.findById(id)
    console.log(user)

    fs.rmSync(`${user.project_disk}:\\szafranprojekt\\${user.project_number}-${user.project_name}`, { recursive: true, force: true });
    user.remove();
    
      res.status(200).json({ success: true,  })
  } catch (err) {
    console.log(err)
      res.status(400).json({ success: false })
  }
}
