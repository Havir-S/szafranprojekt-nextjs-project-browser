import dbConnect from '../../../../lib/dbConnect';
import Project from '../../../../models/Project';

export default async function handler(req, res) {
    const num = Number(req.body);
    console.log(num)

  await dbConnect()


  try {
    for (let i = 0; i < num; i++) {
        const user = await Project.deleteOne({})
    }
      
  } catch (err) {
    console.log(err)
      res.status(400).json({ success: false })
  }
  res.status(200).json({ success: true,  })
}
