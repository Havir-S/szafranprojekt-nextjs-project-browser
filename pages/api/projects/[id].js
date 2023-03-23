
import dbConnect from '../lib/dbConnect'
import Project from '../models/Project'


export default async function handler(req, res) {
    const { query: {id}, method } = req
    console.log(id)

    res.status(200).json({message: 'OK'})

    await dbConnect()

}