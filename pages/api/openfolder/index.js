export default async function handler(req, res) {
    console.log(`Otwarto ${req.body}`)
    require('child_process').exec(`start "" "${req.body}"`);

    res.status(200).json({message: 'OK'})
}